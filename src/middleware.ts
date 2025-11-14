import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getMeUser, getMeUserServer, getUserFromToken } from './utilities/getMeUser'
import { cookies } from 'next/headers'
// import { getMeUserServer } from './utilities/getMeUserServer';
import { getMeUser } from './utilities/getMeUser';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookiesReq = await cookies();
  // Check if the request is for dashboard routes
  if (pathname.startsWith('/dashboard')) {

  const token = cookiesReq.get('payload-token')?.value
    // If no token, redirect to sign-in page
    if (!token) {
      const signInUrl = new URL('/sign-in', request.url)
      // Add the original URL as a redirect parameter so we can send them back after login
      signInUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Verify the token by making a request to the API
    try {
      const baseUrl = request.nextUrl.origin
      const user = await getMeUser()

      // If user is not authenticated, redirect to sign-in
      if (!user.user) {
        const signInUrl = new URL('/sign-in', request.url)
        signInUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(signInUrl)
      }

      // User is authenticated, allow access
      return NextResponse.next()
    } catch (error) {
      console.error('Error verifying token in middleware:', error)
      // On error, redirect to sign-in for security
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Allow all other routes
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
