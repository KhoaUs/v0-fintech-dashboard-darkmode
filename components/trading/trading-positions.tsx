// Trading Positions Component

'use client'

import { useTradingPositions } from '@/lib/trading/hooks'
import { TradingPosition } from '@/lib/trading/types'
import { Loader, TrendingUp, TrendingDown, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TradingPositions() {
  const { positions, isLoading, error, refetch } = useTradingPositions()

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-700">{error}</p>
        <Button
          onClick={refetch}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    )
  }

  if (isLoading && positions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="w-5 h-5 animate-spin text-blue-600" />
      </div>
    )
  }

  if (positions.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        <p>No positions found</p>
      </div>
    )
  }

  const totalValue = positions.reduce((sum, p) => sum + p.totalValue, 0)
  const totalGainLoss = positions.reduce((sum, p) => sum + p.gainLoss, 0)
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-neutral-50 p-4 rounded-lg">
          <p className="text-xs text-neutral-600 mb-1">Total Value</p>
          <p className="text-lg font-semibold text-neutral-900">
            {(totalValue / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-neutral-50 p-4 rounded-lg">
          <p className="text-xs text-neutral-600 mb-1">Gain/Loss</p>
          <p className={`text-lg font-semibold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(totalGainLoss / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-neutral-50 p-4 rounded-lg">
          <p className="text-xs text-neutral-600 mb-1">Return %</p>
          <p className={`text-lg font-semibold ${totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalGainLossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Positions Table */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Symbol</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Qty</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Avg Price</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Current</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Value</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Gain/Loss</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">%</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-900">{position.symbol}</td>
                  <td className="px-4 py-3 text-right text-neutral-700">{position.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-neutral-700">{position.averagePrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-neutral-900 font-medium">{position.currentPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-neutral-700">{(position.totalValue / 1000000).toFixed(1)}M</td>
                  <td className={`px-4 py-3 text-right font-medium ${position.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="flex items-center justify-end gap-1">
                      {position.gainLoss >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {(position.gainLoss / 1000000).toFixed(2)}M
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${position.gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {position.gainLossPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={isLoading}
          className="gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
