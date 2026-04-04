import { auth } from '@/lib/auth'

export default auth((req) => {
  // req.auth is available on all routes
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  // Protected routes
  const protectedRoutes = ['/dashboard', '/teams', '/settings']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect to home if already logged in and trying to access login
  if (pathname === '/login' && isLoggedIn) {
    return Response.redirect(new URL('/', req.nextUrl))
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
