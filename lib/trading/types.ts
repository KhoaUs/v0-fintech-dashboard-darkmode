// Trading provider type definitions

export type TradingProviderType = 'dnse' | 'tcbs' | 'none'

export interface TradingCredentials {
  username: string
  password: string
  apiKey?: string
  apiSecret?: string
  endpoint?: string
}

export interface TradingProviderConnection {
  id: string
  portfolioId: string
  provider: TradingProviderType
  credentials: {
    // Encrypted on backend, only decrypted when needed
    encryptedUsername: string
    encryptedPassword: string
    encryptedApiKey?: string
  }
  isActive: boolean
  lastSyncedAt?: string
  syncStatus: 'idle' | 'syncing' | 'error' | 'success'
  syncError?: string
  createdAt: string
  updatedAt: string
}

export interface TradingAccount {
  accountId: string
  accountName: string
  accountNumber: string
  balance: number
  availableBalance: number
  totalValue: number
  currency: string
}

export interface TradingPosition {
  symbol: string
  quantity: number
  averagePrice: number
  currentPrice: number
  totalValue: number
  gainLoss: number
  gainLossPercent: number
  lastUpdated: string
}

export interface TradingOrder {
  orderId: string
  symbol: string
  orderType: 'buy' | 'sell'
  quantity: number
  price: number
  executedQuantity: number
  executedPrice?: number
  status: 'pending' | 'filled' | 'partial' | 'cancelled'
  createdAt: string
  completedAt?: string
}

export interface SyncHistory {
  id: string
  connectionId: string
  syncType: 'accounts' | 'positions' | 'orders' | 'full'
  status: 'pending' | 'completed' | 'failed'
  startedAt: string
  completedAt?: string
  itemsCount: number
  errorMessage?: string
}

export interface ITradingProvider {
  name: string
  provider: TradingProviderType
  
  // Connection management
  connect(credentials: TradingCredentials): Promise<boolean>
  disconnect(): Promise<void>
  isConnected(): boolean
  
  // Data retrieval
  getAccounts(): Promise<TradingAccount[]>
  getPositions(): Promise<TradingPosition[]>
  getOrders(limit?: number): Promise<TradingOrder[]>
  
  // Order management
  placeOrder(symbol: string, quantity: number, price: number, orderType: 'buy' | 'sell'): Promise<TradingOrder>
  cancelOrder(orderId: string): Promise<boolean>
  
  // Error handling
  getLastError(): string | null
}
