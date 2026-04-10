// Trading Service - manages trading provider lifecycle

import { ITradingProvider, TradingProviderType, TradingCredentials, TradingAccount, TradingPosition, TradingOrder } from './types'
import { DNSEProvider } from './providers/dnse'
import { TCBSProvider } from './providers/tcbs'

export class TradingService {
  private providers: Map<TradingProviderType, ITradingProvider> = new Map()
  private activeProvider: ITradingProvider | null = null
  private activeProviderType: TradingProviderType | null = null

  constructor() {
    // Initialize all available providers
    this.providers.set('dnse', new DNSEProvider())
    this.providers.set('tcbs', new TCBSProvider())
  }

  /**
   * Connect to a trading provider
   */
  async connect(providerType: TradingProviderType, credentials: TradingCredentials): Promise<boolean> {
    if (providerType === 'none') {
      this.activeProvider = null
      this.activeProviderType = null
      return true
    }

    const provider = this.providers.get(providerType)
    if (!provider) {
      throw new Error(`Unknown trading provider: ${providerType}`)
    }

    const connected = await provider.connect(credentials)
    if (connected) {
      this.activeProvider = provider
      this.activeProviderType = providerType
    }
    return connected
  }

  /**
   * Disconnect from current provider
   */
  async disconnect(): Promise<void> {
    if (this.activeProvider) {
      await this.activeProvider.disconnect()
      this.activeProvider = null
      this.activeProviderType = null
    }
  }

  /**
   * Get current provider type
   */
  getActiveProvider(): TradingProviderType | null {
    return this.activeProviderType
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.activeProvider !== null && this.activeProvider.isConnected()
  }

  /**
   * Get last error
   */
  getLastError(): string | null {
    return this.activeProvider?.getLastError() || null
  }

  /**
   * Get trading accounts
   */
  async getAccounts(): Promise<TradingAccount[]> {
    if (!this.activeProvider) {
      throw new Error('No trading provider connected')
    }
    return this.activeProvider.getAccounts()
  }

  /**
   * Get trading positions
   */
  async getPositions(): Promise<TradingPosition[]> {
    if (!this.activeProvider) {
      throw new Error('No trading provider connected')
    }
    return this.activeProvider.getPositions()
  }

  /**
   * Get trading orders
   */
  async getOrders(limit?: number): Promise<TradingOrder[]> {
    if (!this.activeProvider) {
      throw new Error('No trading provider connected')
    }
    return this.activeProvider.getOrders(limit)
  }

  /**
   * Place a trading order
   */
  async placeOrder(symbol: string, quantity: number, price: number, orderType: 'buy' | 'sell'): Promise<TradingOrder> {
    if (!this.activeProvider) {
      throw new Error('No trading provider connected')
    }
    return this.activeProvider.placeOrder(symbol, quantity, price, orderType)
  }

  /**
   * Cancel a trading order
   */
  async cancelOrder(orderId: string): Promise<boolean> {
    if (!this.activeProvider) {
      throw new Error('No trading provider connected')
    }
    return this.activeProvider.cancelOrder(orderId)
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): { type: TradingProviderType; name: string }[] {
    return [
      { type: 'dnse', name: 'DNSE - Dan Viet Securities' },
      { type: 'tcbs', name: 'TCBS - Techcombank Securities' },
    ]
  }
}

// Singleton instance
export const tradingService = new TradingService()
