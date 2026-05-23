import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const validTokens = (process.env.ACCESS_TOKENS || '').split(',').filter(Boolean);

  if (validTokens.length === 0) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 500 });
  }

  if (!validTokens.includes(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return response;
}
