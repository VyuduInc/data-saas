import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import { uploadToS3 } from '@/lib/s3';
import { nanoid } from 'nanoid';
import { getChatCompletion, generateTitle } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];
    const model = formData.get('model') as 'gpt-4' | 'gpt-3.5-turbo' || 'gpt-3.5-turbo';

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
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          take: 10, // Get last 10 messages for context
        },
      },
    });

    if (!chat) {
      const title = await generateTitle(message);
      chat = await prisma.chat.create({
        data: {
          userId,
          active: true,
          title,
        },
        include: {
          messages: true,
        },
      });
    }

    // Handle file uploads
    const fileUrls = [];
    for (const file of files) {
      const fileKey = `${userId}/${chat.id}/${nanoid()}-${file.name}`;
      const fileUrl = await uploadToS3(file, fileKey);
      fileUrls.push(fileUrl);
    }

    // Create user message
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        chatId: chat.id,
        role: 'user',
        files: fileUrls,
      },
    });

    // Prepare context for AI
    const context = chat.messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));
    context.push({ role: 'user', content: message });

    // Get AI response
    const aiMessage = await getChatCompletion(context, model);

    // Save AI response
    const aiResponse = await prisma.message.create({
      data: {
        content: aiMessage.content || 'No response generated',
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
