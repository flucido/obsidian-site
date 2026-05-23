import { NextRequest, NextResponse } from 'next/server';

const VALID_TOKENS = (process.env.ACCESS_TOKENS || '').split(',').filter(Boolean);

export function middleware(req: NextRequest) {
  // Skip auth if no tokens configured
  if (VALID_TOKENS.length === 0) {
    return NextResponse.next();
  }

  const token = req.cookies.get('auth_token')?.value;

  if (token && VALID_TOKENS.includes(token)) {
    return NextResponse.next();
  }

  // Allow login page
  if (req.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // For API routes, return 401
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Redirect to login
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
