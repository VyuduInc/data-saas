import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export async function rateLimitMiddleware(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const identifier = token?.email || req.ip || 'anonymous';
    const now = Date.now();

    if (!rateLimit.has(identifier)) {
      rateLimit.set(identifier, { count: 1, lastReset: now });
      return NextResponse.next();
    }

    const userLimit = rateLimit.get(identifier)!;
    if (now - userLimit.lastReset > WINDOW_SIZE) {
      userLimit.count = 1;
      userLimit.lastReset = now;
      return NextResponse.next();
    }

    if (userLimit.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    userLimit.count++;
    return NextResponse.next();
  } catch (error) {
    console.error('Rate limit error:', error);
    return NextResponse.next();
  }
}
