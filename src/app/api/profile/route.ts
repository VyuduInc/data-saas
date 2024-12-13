import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub as string;
    const { name, email } = await request.json();

    // Validate email format
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email is already taken
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: userId,
          },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name || undefined,
        email: email || undefined,
      },
    });

    return NextResponse.json({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
