import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function DELETE(
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

    // Delete chat and all related messages
    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return NextResponse.json(
      { error: 'Failed to delete chat' },
      { status: 500 }
    );
  }
}
