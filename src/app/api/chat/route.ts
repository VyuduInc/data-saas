import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // TODO: Add your AI model integration here
    // For now, we'll just echo back a response
    const response = `I received your message: "${message}". This is a placeholder response.`;

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
