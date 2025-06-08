import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // In a real application, you would check for authentication
  // For demo purposes, we'll allow all requests

  // Example of how you would protect admin routes:
  /*
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAuthenticated = request.cookies.has('auth_token')
  
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  */

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
