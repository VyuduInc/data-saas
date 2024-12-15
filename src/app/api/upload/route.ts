import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Encryption helper functions
const generateEncryptionKey = () => crypto.randomBytes(32);
const generateIV = () => crypto.randomBytes(16);

const encryptFile = (buffer: Buffer, key: Buffer, iv: Buffer) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
};

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const analysisId = formData.get('analysisId') as string;
    const shouldEncrypt = formData.get('encrypt') === 'true';

    // Get user settings
    const user = await prisma.user.findUnique({
      where: { id: token.sub as string },
      select: { settings: true },
    });

    const settings = user?.settings as any || {};
    const maxFileSize = (settings.security?.maxFileSize || 10) * 1024 * 1024; // Convert MB to bytes

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: `File size exceeds the maximum limit of ${maxFileSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let finalBuffer = buffer;
    let encryptionKey, iv;

    if (shouldEncrypt) {
      encryptionKey = generateEncryptionKey();
      iv = generateIV();
      finalBuffer = encryptFile(buffer, encryptionKey, iv);
    }

    const fileKey = `${token.sub}/${analysisId}/${file.name}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
      ContentType: file.type,
      Metadata: shouldEncrypt ? {
        encrypted: 'true',
        iv: iv?.toString('hex'),
      } : undefined,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Create file record in database
    const fileRecord = await prisma.file.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        path: fileKey,
        encrypted: shouldEncrypt,
        analysisId,
        deleteAt: settings.security?.autoDeleteDays ? 
          new Date(Date.now() + settings.security.autoDeleteDays * 24 * 60 * 60 * 1000) : 
          null,
      },
    });

    return NextResponse.json({
      fileId: fileRecord.id,
      uploadUrl: signedUrl,
      encryptionKey: encryptionKey?.toString('hex'),
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
