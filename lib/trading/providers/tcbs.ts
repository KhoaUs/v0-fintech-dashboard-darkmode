// TCBS (Techcombank Securities) Trading Provider

import { BaseTradingProvider } from '../base-provider'
import { TradingAccount, TradingPosition, TradingOrder } from '../types'

export class TCBSProvider extends BaseTradingProvider {
  name = 'TCBS'
  provider: 'tcbs' = 'tcbs'

  protected async validateConnection(): Promise<boolean> {
    if (!this.credentials) return false
    
    try {
      // Simulate API call to TCBS
      // In production: https://api.tcbs.com.vn/v2/auth/login
      const response = await this.simulateTCBSAuth(this.credentials)
      return response.success
    } catch (error) {
      this.lastError = `TCBS connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      return false
    }
  }

  async getAccounts(): Promise<TradingAccount[]> {
    this.checkConnection()
    
    // Mock TCBS accounts
    return [
      {
        accountId: 'tcbs-2001',
        accountName: 'TCBS Trading Account',
        accountNumber: '0987654321',
        balance: 75000000,
        availableBalance: 55000000,
        totalValue: 125000000,
        currency: 'VND'
      },
      {
        accountId: 'tcbs-2002',
        accountName: 'TCBS Margin Account',
        accountNumber: '0987654322',
        balance: 30000000,
        availableBalance: 20000000,
        totalValue: 45000000,
        currency: 'VND'
      }
    ]
  }

  async getPositions(): Promise<TradingPosition[]> {
    this.checkConnection()
    
    // Mock TCBS positions
    return [
      {
        symbol: 'ACB',
        quantity: 800,
        averagePrice: 28500,
        currentPrice: 30200,
        totalValue: 24160000,
        gainLoss: 1360000,
        gainLossPercent: 5.96,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'BVH',
        quantity: 300,
        averagePrice: 98000,
        currentPrice: 101500,
        totalValue: 30450000,
        gainLoss: 1050000,
        gainLossPercent: 3.57,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'CTG',
        quantity: 1500,
        averagePrice: 25600,
        currentPrice: 26800,
        totalValue: 40200000,
        gainLoss: 1800000,
        gainLossPercent: 4.69,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'MWG',
        quantity: 600,
        averagePrice: 85000,
        currentPrice: 88500,
        totalValue: 53100000,
        gainLoss: 2100000,
        gainLossPercent: 4.12,
        lastUpdated: new Date().toISOString()
      }
    ]
  }

  async getOrders(limit: number = 20): Promise<TradingOrder[]> {
    this.checkConnection()
    
    // Mock TCBS orders
    return [
      {
        orderId: 'tcbs-ord-001',
        symbol: 'ACB',
        orderType: 'buy',
        quantity: 200,
        price: 30000,
        executedQuantity: 200,
        executedPrice: 30100,
        status: 'filled',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        completedAt: new Date(Date.now() - 259100000).toISOString()
      },
      {
        orderId: 'tcbs-ord-002',
        symbol: 'BVH',
        orderType: 'buy',
        quantity: 100,
        price: 101000,
        executedQuantity: 100,
        executedPrice: 101200,
        status: 'filled',
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        completedAt: new Date(Date.now() - 345500000).toISOString()
      },
      {
        orderId: 'tcbs-ord-003',
        symbol: 'CTG',
        orderType: 'buy',
        quantity: 500,
        price: 25500,
        executedQuantity: 500,
        executedPrice: 25550,
        status: 'filled',
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        completedAt: new Date(Date.now() - 431900000).toISOString()
      }
    ].slice(0, limit)
  }

  async placeOrder(symbol: string, quantity: number, price: number, orderType: 'buy' | 'sell'): Promise<TradingOrder> {
    this.checkConnection()
    
    return {
      orderId: `tcbs-ord-${Date.now()}`,
      symbol,
      orderType,
      quantity,
      price,
      executedQuantity: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    this.checkConnection()
    
    // Simulate API call
    return true
  }

  private async simulateTCBSAuth(credentials: any): Promise<{ success: boolean; token?: string }> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // In production, validate actual credentials
    if (credentials.username && credentials.password) {
      return { success: true, token: 'tcbs_token_' + Date.now() }
    }
    return { success: false }
  }
}


export class TCBSProvider extends BaseTradingProvider {
  name = 'TCBS'
  provider: 'tcbs' = 'tcbs'

  protected async validateConnection(): Promise<boolean> {
    if (!this.credentials) return false
    
    try {
      // Simulate API call to TCBS
      // In production: https://api.tcbs.com.vn/v2/auth/login
      const response = await this.simulateTCBSAuth(this.credentials)
      return response.success
    } catch (error) {
      this.lastError = `TCBS connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      return false
    }
  }

  async getAccounts(): Promise<TradingAccount[]> {
    this.checkConnection()
    
    // Mock TCBS accounts
    return [
      {
        accountId: 'tcbs-2001',
        accountName: 'TCBS Trading Account',
        accountNumber: '0987654321',
        balance: 75000000,
        availableBalance: 55000000,
        totalValue: 125000000,
        currency: 'VND'
      },
      {
        accountId: 'tcbs-2002',
        accountName: 'TCBS Margin Account',
        accountNumber: '0987654322',
        balance: 30000000,
        availableBalance: 20000000,
        totalValue: 45000000,
        currency: 'VND'
      }
    ]
  }

  async getPositions(): Promise<TradingPosition[]> {
    this.checkConnection()
    
    // Mock TCBS positions
    return [
      {
        symbol: 'ACB',
        quantity: 800,
        averagePrice: 28500,
        currentPrice: 30200,
        totalValue: 24160000,
        gainLoss: 1360000,
        gainLossPercent: 5.96,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'BVH',
        quantity: 300,
        averagePrice: 98000,
        currentPrice: 101500,
        totalValue: 30450000,
        gainLoss: 1050000,
        gainLossPercent: 3.57,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'CTG',
        quantity: 1500,
        averagePrice: 25600,
        currentPrice: 26800,
        totalValue: 40200000,
        gainLoss: 1800000,
        gainLossPercent: 4.69,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'MWG',
        quantity: 600,
        averagePrice: 85000,
        currentPrice: 88500,
        totalValue: 53100000,
        gainLoss: 2100000,
        gainLossPercent: 4.12,
        lastUpdated: new Date().toISOString()
      }
    ]
  }

  async getOrders(limit: number = 20): Promise<TradingOrder[]> {
    this.checkConnection()
    
    // Mock TCBS orders
    return [
      {
        orderId: 'tcbs-ord-001',
        symbol: 'ACB',
        orderType: 'buy',
        quantity: 200,
        price: 30000,
        executedQuantity: 200,
        executedPrice: 30100,
        status: 'filled',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        completedAt: new Date(Date.now() - 259100000).toISOString()
      },
      {
        orderId: 'tcbs-ord-002',
        symbol: 'BVH',
        orderType: 'buy',
        quantity: 100,
        price: 101000,
        executedQuantity: 100,
        executedPrice: 101200,
        status: 'filled',
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        completedAt: new Date(Date.now() - 345500000).toISOString()
      },
      {
        orderId: 'tcbs-ord-003',
        symbol: 'CTG',
        orderType: 'buy',
        quantity: 500,
        price: 25500,
        executedQuantity: 500,
        executedPrice: 25550,
        status: 'filled',
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        completedAt: new Date(Date.now() - 431900000).toISOString()
      }
    ].slice(0, limit)
  }

  async placeOrder(symbol: string, quantity: number, price: number, orderType: 'buy' | 'sell'): Promise<TradingOrder> {
    this.checkConnection()
    
    return {
      orderId: `tcbs-ord-${Date.now()}`,
      symbol,
      orderType,
      quantity,
      price,
      executedQuantity: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    this.checkConnection()
    
    // Simulate API call
    return true
  }

  private async simulateTCBSAuth(credentials: any): Promise<{ success: boolean; token?: string }> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // In production, validate actual credentials
    if (credentials.username && credentials.password) {
      return { success: true, token: 'tcbs_token_' + Date.now() }
    }
    return { success: false }
  }
}
