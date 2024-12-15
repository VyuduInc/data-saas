import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { pusherServer, EVENTS } from '@/lib/pusher';
import { rateLimit } from '@/lib/rateLimit';

const messageSchema = z.object({
  content: z.string().min(1).max(10000),
  type: z.enum(['text', 'code', 'image']),
  metadata: z.record(z.any()).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const messages = await prisma.message.findMany({
      where: {
        chatId: params.chatId,
        chat: {
          userId: session.user.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { success } = await rateLimit.limit(session.user.id);
    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    const json = await req.json();
    const body = messageSchema.parse(json);

    const message = await prisma.message.create({
      data: {
        ...body,
        chatId: params.chatId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    await pusherServer.trigger(
      `chat-${params.chatId}`,
      EVENTS.MESSAGE_SENT,
      message
    );

    return NextResponse.json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 400 });
    }
    console.error('Error creating message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { chatId: string; messageId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const body = messageSchema.partial().parse(json);

    const message = await prisma.message.update({
      where: {
        id: params.messageId,
        userId: session.user.id,
      },
      data: body,
    });

    await pusherServer.trigger(
      `chat-${params.chatId}`,
      EVENTS.MESSAGE_UPDATED,
      {
        id: params.messageId,
        updates: body,
      }
    );

    return NextResponse.json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 400 });
    }
    console.error('Error updating message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatId: string; messageId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prisma.message.delete({
      where: {
        id: params.messageId,
        userId: session.user.id,
      },
    });

    await pusherServer.trigger(
      `chat-${params.chatId}`,
      EVENTS.MESSAGE_DELETED,
      params.messageId
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
