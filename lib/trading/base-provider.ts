// Base trading provider implementation

import { ITradingProvider, TradingCredentials, TradingAccount, TradingPosition, TradingOrder, TradingProviderType } from './types'

export abstract class BaseTradingProvider implements ITradingProvider {
  abstract name: string
  abstract provider: TradingProviderType
  protected connected: boolean = false
  protected lastError: string | null = null
  protected credentials: TradingCredentials | null = null

  async connect(credentials: TradingCredentials): Promise<boolean> {
    try {
      this.credentials = credentials
      const result = await this.validateConnection()
      this.connected = result
      if (!result) {
        this.lastError = 'Connection validation failed'
      }
      return result
    } catch (error) {
      this.lastError = error instanceof Error ? error.message : 'Unknown error'
      this.connected = false
      return false
    }
  }

  async disconnect(): Promise<void> {
    this.credentials = null
    this.connected = false
    this.lastError = null
  }

  isConnected(): boolean {
    return this.connected
  }

  getLastError(): string | null {
    return this.lastError
  }

  // Abstract methods to be implemented by subclasses
  protected abstract validateConnection(): Promise<boolean>
  abstract getAccounts(): Promise<TradingAccount[]>
  abstract getPositions(): Promise<TradingPosition[]>
  abstract getOrders(limit?: number): Promise<TradingOrder[]>
  abstract placeOrder(symbol: string, quantity: number, price: number, orderType: 'buy' | 'sell'): Promise<TradingOrder>
  abstract cancelOrder(orderId: string): Promise<boolean>

  protected checkConnection(): void {
    if (!this.connected) {
      throw new Error(`${this.name} is not connected. Please connect first.`)
    }
  }
}
