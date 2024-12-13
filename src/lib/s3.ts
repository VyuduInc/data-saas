import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File, key: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const bucketName = process.env.AWS_S3_BUCKET!;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return \`https://\${bucketName}.s3.\${process.env.AWS_REGION}.amazonaws.com/\${key}\`;
}
