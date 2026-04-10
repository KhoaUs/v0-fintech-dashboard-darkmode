// Trading Provider Connection Modal

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { useTradingConnection } from '@/lib/trading/hooks'
import { TradingProviderType } from '@/lib/trading/types'

interface TradingProviderModalProps {
  isOpen: boolean
  onClose: () => void
  onConnected?: (provider: TradingProviderType) => void
}

const PROVIDERS = [
  {
    type: 'dnse' as TradingProviderType,
    name: 'DNSE',
    fullName: 'Dan Viet Securities',
    description: 'Connect to DNSE for real-time trading'
  },
  {
    type: 'tcbs' as TradingProviderType,
    name: 'TCBS',
    fullName: 'Techcombank Securities',
    description: 'Connect to TCBS for trading and market data'
  }
]

export function TradingProviderModal({ isOpen, onClose, onConnected }: TradingProviderModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<TradingProviderType | null>(null)
  const [step, setStep] = useState<'select' | 'credentials'>('select')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, error, connect } = useTradingConnection()

  const handleSelectProvider = (provider: TradingProviderType) => {
    setSelectedProvider(provider)
    setStep('credentials')
    setUsername('')
    setPassword('')
  }

  const handleConnect = async () => {
    if (!selectedProvider || !username || !password) {
      return
    }

    const success = await connect(selectedProvider, {
      username,
      password
    })

    if (success) {
      onConnected?.(selectedProvider)
      onClose()
    }
  }

  const handleBack = () => {
    setStep('select')
    setSelectedProvider(null)
    setUsername('')
    setPassword('')
  }

  const selectedProviderInfo = PROVIDERS.find(p => p.type === selectedProvider)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'select' ? (
          <>
            <DialogHeader>
              <DialogTitle>Connect Trading Provider</DialogTitle>
              <DialogDescription>
                Choose a securities provider to connect your trading account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {PROVIDERS.map(provider => (
                <button
                  key={provider.type}
                  onClick={() => handleSelectProvider(provider.type)}
                  className="w-full p-4 border border-neutral-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="font-semibold text-neutral-900">{provider.fullName}</div>
                  <div className="text-sm text-neutral-500">{provider.description}</div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Connect {selectedProviderInfo?.fullName}</DialogTitle>
              <DialogDescription>
                Enter your {selectedProviderInfo?.name} trading account credentials
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="username">Username / Email</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              <p className="text-xs text-neutral-500">
                Your credentials are encrypted and never stored on our servers.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConnect}
                  disabled={isLoading || !username || !password}
                  className="flex-1 gap-2"
                >
                  {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                  Connect
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
