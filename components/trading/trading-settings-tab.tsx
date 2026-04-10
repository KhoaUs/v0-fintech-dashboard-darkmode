// Trading Settings Tab - Add to Portfolio Dashboard

'use client'

import { useState } from 'react'
import { useTradingConnection } from '@/lib/trading/hooks'
import { TradingProviderModal } from './trading-provider-modal'
import { TradingPositions } from './trading-positions'
import { TradingOrders } from './trading-orders'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, LinkIcon, Unlink, TrendingUp, BarChart3 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function TradingSettingsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { provider, isConnected, error, disconnect } = useTradingConnection()

  const getProviderName = (type: string) => {
    switch (type) {
      case 'dnse':
        return 'DNSE - Dan Viet Securities'
      case 'tcbs':
        return 'TCBS - Techcombank Securities'
      default:
        return 'Unknown'
    }
  }

  if (!isConnected && !provider) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <LinkIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-2">Connect Trading Account</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Link your trading account to automatically sync positions and orders. Supported providers: DNSE and TCBS.
              </p>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Connect Trading Account
              </Button>
            </div>
          </div>
        </div>

        <TradingProviderModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConnected={() => {
            // Refetch data after connection
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div>
              <p className="font-medium text-neutral-900">Connected to {getProviderName(provider || '')}</p>
              <p className="text-sm text-neutral-500">Real-time sync enabled</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <Unlink className="w-4 h-4" />
            Disconnect
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Trading Data Tabs */}
      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="positions" className="gap-2 flex-1">
            <TrendingUp className="w-4 h-4" />
            Positions
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2 flex-1">
            <BarChart3 className="w-4 h-4" />
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="mt-6">
          <TradingPositions />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <TradingOrders />
        </TabsContent>
      </Tabs>
    </div>
  )
}
