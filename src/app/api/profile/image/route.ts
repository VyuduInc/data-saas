import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import { uploadToS3 } from '@/lib/s3';

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub as string;
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image must be less than 5MB' },
        { status: 400 }
      );
    }

    // Upload to S3
    const imageUrl = await uploadToS3(file, \`profile/\${userId}\`);

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });

    return NextResponse.json({
      imageUrl: updatedUser.image,
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
