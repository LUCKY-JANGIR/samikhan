// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the 'token' cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set('token', '', { maxAge: -1 }); // Removes the cookie

  return response;
}
