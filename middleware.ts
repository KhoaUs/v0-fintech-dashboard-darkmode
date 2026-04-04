import { withAuth } from 'next-auth/middleware'

export const middleware = withAuth(
  function middleware(req) {
    return undefined
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/((?!api/auth|login|_next/static|_next/image|favicon.ico|icon.svg).*)',
  ],
}
