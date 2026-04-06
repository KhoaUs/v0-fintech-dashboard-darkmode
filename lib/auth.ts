import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

// Generate a consistent secret for development if not provided
const getSecret = () => {
  if (process.env.NEXTAUTH_SECRET) {
    return process.env.NEXTAUTH_SECRET
  }
  // Use a consistent secret for development
  if (process.env.NODE_ENV === 'development') {
    return 'tech-fund-development-secret-key-12345'
  }
  // Require secret in production
  throw new Error('NEXTAUTH_SECRET must be set in production')
}

// Define the shape of our user
declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: 'customer' | 'account_owner' | 'team_leader' | 'admin'
    org_id: string
  }

  interface Session {
    user: User
  }
}

// Zod schema for login validation
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Mock user database for demo
// In production, this would query your database
const DEMO_USERS = {
  'admin@techgrowth.fund': {
    id: 'user-admin',
    email: 'admin@techgrowth.fund',
    name: 'Admin User',
    role: 'admin',
    org_id: 'org-1',
    password: 'password123',
  },
  'john@techgrowth.fund': {
    id: 'user-john',
    email: 'john@techgrowth.fund',
    name: 'John Leader',
    role: 'team_leader',
    org_id: 'org-1',
    password: 'password123',
  },
  'alice@techgrowth.fund': {
    id: 'user-alice',
    email: 'alice@techgrowth.fund',
    name: 'Alice Owner',
    role: 'account_owner',
    org_id: 'org-1',
    password: 'password123',
  },
  'bob@techgrowth.fund': {
    id: 'user-bob',
    email: 'bob@techgrowth.fund',
    name: 'Bob Customer',
    role: 'customer',
    org_id: 'org-1',
    password: 'password123',
  },
} as const

async function getUser(email: string) {
  return DEMO_USERS[email as keyof typeof DEMO_USERS] || null
}

const handler = NextAuth({
  secret: getSecret(),
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.org_id = user.org_id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as any
        session.user.org_id = token.org_id as string
      }
      return session
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data
        const user = await getUser(email)

        if (!user) {
          return null
        }

        // Simple password check for demo (in production, use bcrypt on server)
        if (password !== user.password) {
          return null
        }

        // Return user data
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          org_id: user.org_id,
        }
      },
    }),
  ],
})

export const { GET, POST } = handler
export const auth = handler
export const signIn = handler.signIn
export const signOut = handler.signOut

