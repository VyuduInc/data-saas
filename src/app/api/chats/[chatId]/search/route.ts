import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

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
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || 'all';
    const dateRange = searchParams.get('dateRange') || 'all';

    // Build the where clause based on filters
    const where: any = {
      chatId: params.chatId,
      chat: {
        userId: session.user.id,
      },
    };

    // Add type filter
    if (type !== 'all') {
      where.type = type;
    }

    // Add date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      let date = new Date();

      switch (dateRange) {
        case 'today':
          date.setHours(0, 0, 0, 0);
          break;
        case 'week':
          date.setDate(date.getDate() - 7);
          break;
        case 'month':
          date.setMonth(date.getMonth() - 1);
          break;
      }

      where.createdAt = {
        gte: date,
        lte: now,
      };
    }

    // Add content search if query exists
    if (query) {
      where.OR = [
        {
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          user: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
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
      take: 50,
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error searching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
