import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  model: z.enum(['gpt-4', 'gpt-3.5-turbo']),
  runtime: z.enum(['Python', 'JavaScript']),
  alwaysShowCode: z.boolean(),
  context: z.string().max(1000),
  responseStyle: z.string().max(200),
});

export async function GET(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub as string;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { settings: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.settings || {});
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub as string;
    const body = await request.json();

    try {
      const settings = settingsSchema.parse(body);

      const user = await prisma.user.update({
        where: { id: userId },
        data: { settings },
        select: { settings: true },
      });

      return NextResponse.json(user.settings);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid settings format', details: validationError.errors },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
