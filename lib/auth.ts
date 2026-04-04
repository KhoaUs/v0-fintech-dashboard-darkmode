import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcrypt from 'bcrypt'

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

async function getUser(email: string) {
  // This is a placeholder. In production, query the database
  // For now, return mock users for testing
  const users: Record<string, any> = {
    'admin@techgrowth.fund': {
      id: 'user-admin',
      email: 'admin@techgrowth.fund',
      name: 'Admin User',
      role: 'admin',
      org_id: 'org-1',
      password_hash: await bcrypt.hash('password123', 10),
    },
    'john@techgrowth.fund': {
      id: 'user-john',
      email: 'john@techgrowth.fund',
      name: 'John Leader',
      role: 'team_leader',
      org_id: 'org-1',
      password_hash: await bcrypt.hash('password123', 10),
    },
    'alice@techgrowth.fund': {
      id: 'user-alice',
      email: 'alice@techgrowth.fund',
      name: 'Alice Owner',
      role: 'account_owner',
      org_id: 'org-1',
      password_hash: await bcrypt.hash('password123', 10),
    },
    'bob@techgrowth.fund': {
      id: 'user-bob',
      email: 'bob@techgrowth.fund',
      name: 'Bob Customer',
      role: 'customer',
      org_id: 'org-1',
      password_hash: await bcrypt.hash('password123', 10),
    },
  }

  return users[email] || null
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
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

        // Verify password
        const passwordsMatch = await bcrypt.compare(password, user.password_hash)

        if (!passwordsMatch) {
          return null
        }

        // Return user data without password hash
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
        session.user.role = token.role as string
        session.user.org_id = token.org_id as string
      }
      return session
    },
  },
})
