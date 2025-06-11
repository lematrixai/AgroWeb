import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/action/action.auth'

// List of paths that don't require authentication
const publicPaths = ['/login', '/', '/forgot-password']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log('Middleware processing path:', path)

  // Check if user is logged in
  const session = await verifySession()
  console.log('Session verification result:', session)

  // If user is logged in and tries to access login page, redirect to home
  if (session.success && path === '/login') {
    console.log('Logged in user trying to access login page, redirecting to home')
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Allow access to public paths
  if (publicPaths.includes(path)) {
    console.log('Public path, allowing access')
    return NextResponse.next()
  }

  // Only protect admin routes
  if (path.startsWith('/admin')) {
    console.log('Admin route detected, verifying session')

    if (!session.success) {
      console.log('No valid session, redirecting to login')
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }

    console.log('Admin access granted')
    const response = NextResponse.next()
    
    // Add user info to headers for server components
    response.headers.set('x-user-id', String(session.uid))
    response.headers.set('x-user-email', String(session.email))
    response.headers.set('x-user-role', String(session.role))
    
    return response
  }

  // Allow access to all other routes
  console.log('Non-admin route, allowing access')
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/',
    '/forgot-password'
  ]
}
