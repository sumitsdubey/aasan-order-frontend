// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get token from cookies or headers
  const token = request.cookies.get('token')?.value;
  
  // Define protected routes
  const protectedRoutes = ['/dashboard'];
  
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};