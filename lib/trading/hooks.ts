// React hooks for trading functionality

'use client'

import { useState, useCallback, useEffect } from 'react'
import { tradingService } from './service'
import { TradingProviderType, TradingCredentials, TradingAccount, TradingPosition, TradingOrder } from './types'

interface UseTradingConnectionState {
  provider: TradingProviderType | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

export function useTradingConnection() {
  const [state, setState] = useState<UseTradingConnectionState>({
    provider: null,
    isConnected: false,
    isLoading: false,
    error: null,
  })

  const connect = useCallback(async (providerType: TradingProviderType, credentials: TradingCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const success = await tradingService.connect(providerType, credentials)
      if (success) {
        setState({
          provider: providerType,
          isConnected: true,
          isLoading: false,
          error: null,
        })
      } else {
        const error = tradingService.getLastError()
        setState({
          provider: null,
          isConnected: false,
          isLoading: false,
          error: error || 'Connection failed',
        })
      }
      return success
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setState({
        provider: null,
        isConnected: false,
        isLoading: false,
        error: errorMessage,
      })
      return false
    }
  }, [])

  const disconnect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      await tradingService.disconnect()
      setState({
        provider: null,
        isConnected: false,
        isLoading: false,
        error: null,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setState(prev => ({ ...prev, error: errorMessage, isLoading: false }))
    }
  }, [])

  return { ...state, connect, disconnect }
}

export function useTradingAccounts() {
  const [accounts, setAccounts] = useState<TradingAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await tradingService.getAccounts()
      setAccounts(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch accounts'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tradingService.isConnected()) {
      fetchAccounts()
    }
  }, [fetchAccounts])

  return { accounts, isLoading, error, refetch: fetchAccounts }
}

export function useTradingPositions() {
  const [positions, setPositions] = useState<TradingPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPositions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await tradingService.getPositions()
      setPositions(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch positions'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tradingService.isConnected()) {
      fetchPositions()
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchPositions, 30000)
      return () => clearInterval(interval)
    }
  }, [fetchPositions])

  return { positions, isLoading, error, refetch: fetchPositions }
}

export function useTradingOrders() {
  const [orders, setOrders] = useState<TradingOrder[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async (limit: number = 20) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await tradingService.getOrders(limit)
      setOrders(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tradingService.isConnected()) {
      fetchOrders()
      // Poll for updates every 20 seconds
      const interval = setInterval(() => fetchOrders(), 20000)
      return () => clearInterval(interval)
    }
  }, [fetchOrders])

  return { orders, isLoading, error, refetch: fetchOrders }
}
