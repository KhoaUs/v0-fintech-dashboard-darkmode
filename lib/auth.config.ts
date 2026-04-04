import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/teams') ||
        nextUrl.pathname.startsWith('/settings')

      if (isOnDashboard) {
        // Redirect unauthenticated users to login page.
        return isLoggedIn ? true : false
      } else if (isLoggedIn) {
        // Redirect authenticated users away from login page
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig
