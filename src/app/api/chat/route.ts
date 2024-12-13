import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

    if (!message && files.length === 0) {
      return NextResponse.json({ error: 'No message or files provided' }, { status: 400 });
    }

    const userId = token.sub as string;

    // Create or get existing chat
    let chat = await prisma.chat.findFirst({
      where: {
        userId,
        active: true,
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          userId,
          active: true,
        },
      });
    }

    // Handle file uploads
    const fileUrls = [];
    for (const file of files) {
      // Save file and get URL
      // TODO: Implement file storage (e.g., S3, local storage)
      fileUrls.push(`/uploads/${file.name}`);
    }

    // Create message
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        chatId: chat.id,
        role: 'user',
        files: fileUrls,
      },
    });

    // TODO: Add your AI model integration here
    // For now, we'll just echo back a response
    const aiResponse = await prisma.message.create({
      data: {
        content: `I received your message: "${message}". ${
          files.length > 0 ? `And ${files.length} files.` : ''
        } This is a placeholder response.`,
        chatId: chat.id,
        role: 'assistant',
      },
    });

    return NextResponse.json({ 
      message: newMessage,
      response: aiResponse,
      chatId: chat.id
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
