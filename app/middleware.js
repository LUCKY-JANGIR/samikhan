// src/middleware.js (for Next.js 13 with App directory)
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // If no token, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    // If valid, allow the request
    return NextResponse.next();
  } catch (err) {
    // If invalid, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define the protected routes
export const config = {
  matcher: ['/protected/*'],
};
