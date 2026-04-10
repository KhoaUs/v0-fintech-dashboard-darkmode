// Trading Orders Component

'use client'

import { useTradingOrders } from '@/lib/trading/hooks'
import { TradingOrder } from '@/lib/trading/types'
import { Loader, RotateCw, Check, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'

export function TradingOrders() {
  const { orders, isLoading, error, refetch } = useTradingOrders()

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

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="w-5 h-5 animate-spin text-blue-600" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        <p>No orders found</p>
      </div>
    )
  }

  const getStatusIcon = (status: TradingOrder['status']) => {
    switch (status) {
      case 'filled':
        return <Check className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-blue-600" />
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: TradingOrder['status']) => {
    const styles = {
      filled: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      partial: 'bg-blue-50 text-blue-700 border-blue-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    }
    return styles[status] || ''
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-neutral-50 p-3 rounded-lg">
          <p className="text-xs text-neutral-600">Total Orders</p>
          <p className="text-lg font-semibold text-neutral-900">{orders.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-xs text-green-700">Filled</p>
          <p className="text-lg font-semibold text-green-700">{orders.filter(o => o.status === 'filled').length}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-xs text-yellow-700">Pending</p>
          <p className="text-lg font-semibold text-yellow-700">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-xs text-red-700">Cancelled</p>
          <p className="text-lg font-semibold text-red-700">{orders.filter(o => o.status === 'cancelled').length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Symbol</th>
                <th className="px-4 py-3 text-center font-semibold text-neutral-700">Type</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Qty</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Price</th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Executed</th>
                <th className="px-4 py-3 text-center font-semibold text-neutral-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-4 py-3 text-neutral-600 text-xs">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{order.symbol}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      order.orderType === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.orderType.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-neutral-700">{order.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-neutral-700">{order.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="text-neutral-900 font-medium">
                      {order.executedQuantity.toLocaleString()}
                    </div>
                    {order.executedPrice && (
                      <div className="text-xs text-neutral-500">@ {order.executedPrice.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusBadge(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
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
