import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Example: Modify request based on pathname
  if (pathname === '/api/custom-middleware') {
    const res = NextResponse.json({ message: 'Hello from middleware!' });
    return res;
  }

  // Continue with normal request handling
  return NextResponse.next();
}
