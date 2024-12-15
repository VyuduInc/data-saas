import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chatId = params.id;
    const userId = token.sub as string;
    const { title } = await request.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Invalid title provided' },
        { status: 400 }
      );
    }

    // Verify chat belongs to user
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    // Update chat title
    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        title: title.slice(0, 100), // Limit title length
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error updating chat title:', error);
    return NextResponse.json(
      { error: 'Failed to update chat title' },
      { status: 500 }
    );
  }
}
