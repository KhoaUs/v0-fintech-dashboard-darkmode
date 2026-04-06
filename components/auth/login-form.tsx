'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, LogIn } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push('/')
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">TI</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground text-center">
            Tech Fund
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Portfolio Management Dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={isLoading}
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase">
            Demo Credentials
          </p>
          <div className="space-y-2 text-xs">
            <div className="rounded bg-muted p-2">
              <p className="font-medium text-foreground">Admin</p>
              <p className="text-muted-foreground">admin@techgrowth.fund / password123</p>
            </div>
            <div className="rounded bg-muted p-2">
              <p className="font-medium text-foreground">Team Leader</p>
              <p className="text-muted-foreground">john@techgrowth.fund / password123</p>
            </div>
            <div className="rounded bg-muted p-2">
              <p className="font-medium text-foreground">Account Owner</p>
              <p className="text-muted-foreground">alice@techgrowth.fund / password123</p>
            </div>
            <div className="rounded bg-muted p-2">
              <p className="font-medium text-foreground">Customer</p>
              <p className="text-muted-foreground">bob@techgrowth.fund / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
