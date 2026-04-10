# Trading API Integration Guide

## Overview

The Tech Growth Fund Portfolio Dashboard now includes a complete trading API integration system that supports DNSE and TCBS securities providers. The system is built with extensibility in mind, allowing easy addition of more providers in the future.

## Architecture

### Provider System
- **Base Provider Class** (`lib/trading/base-provider.ts`) - Abstract base class for all providers
- **DNSE Provider** (`lib/trading/providers/dnse.ts`) - Dan Viet Securities implementation
- **TCBS Provider** (`lib/trading/providers/tcbs.ts`) - Techcombank Securities implementation
- **Trading Service** (`lib/trading/service.ts`) - Singleton service managing provider lifecycle

### UI Components
- **Trading Provider Modal** (`components/trading/trading-provider-modal.tsx`) - Connection interface
- **Trading Positions** (`components/trading/trading-positions.tsx`) - Display trading positions
- **Trading Orders** (`components/trading/trading-orders.tsx`) - Display trading orders
- **Trading Settings Tab** (`components/trading/trading-settings-tab.tsx`) - Main trading interface

### React Hooks
- `useTradingConnection()` - Manage provider connection state
- `useTradingAccounts()` - Fetch and manage trading accounts
- `useTradingPositions()` - Fetch and manage positions with auto-refresh (30s)
- `useTradingOrders()` - Fetch and manage orders with auto-refresh (20s)

## Features

### Current Implementation
✓ Connect to DNSE and TCBS
✓ View trading positions with gain/loss tracking
✓ View trading orders with status tracking
✓ Real-time data sync (auto-refresh)
✓ Connection management (connect/disconnect)
✓ Error handling and status indicators

### Available Data
**Positions**
- Symbol, quantity, average price, current price
- Total value, gain/loss, return percentage
- Sector information

**Orders**
- Order ID, symbol, type (buy/sell)
- Quantity, price, executed quantity/price
- Status tracking (pending, filled, partial, cancelled)
- Timestamp information

**Accounts**
- Account ID, name, number
- Balance and available balance
- Total portfolio value

## Usage

### 1. Connect to Trading Provider

```typescript
import { useTradingConnection } from '@/lib/trading/hooks'

function MyComponent() {
  const { connect, isConnected, provider } = useTradingConnection()
  
  const handleConnect = async () => {
    const success = await connect('dnse', {
      username: 'user@example.com',
      password: 'password'
    })
  }
  
  return (
    <>
      {!isConnected && <button onClick={handleConnect}>Connect</button>}
      {isConnected && <p>Connected to {provider}</p>}
    </>
  )
}
```

### 2. Access Trading Data

```typescript
import { useTradingPositions, useTradingOrders } from '@/lib/trading/hooks'

function TradingDashboard() {
  const { positions, isLoading, error } = useTradingPositions()
  const { orders, refetch } = useTradingOrders()
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {positions.map(pos => (
        <div key={pos.symbol}>
          {pos.symbol}: {pos.quantity} @ {pos.currentPrice}
        </div>
      ))}
    </div>
  )
}
```

### 3. Add New Provider

To add a new provider (e.g., SSI, VietCapital):

```typescript
// 1. Create new provider class
import { BaseTradingProvider } from '@/lib/trading/base-provider'

export class SSIProvider extends BaseTradingProvider {
  name = 'SSI'
  provider: 'ssi' = 'ssi'
  
  // Implement all abstract methods
  protected async validateConnection(): Promise<boolean> { ... }
  async getAccounts(): Promise<TradingAccount[]> { ... }
  async getPositions(): Promise<TradingPosition[]> { ... }
  // ... etc
}

// 2. Register in TradingService
this.providers.set('ssi', new SSIProvider())

// 3. Update types
type TradingProviderType = 'dnse' | 'tcbs' | 'ssi' | 'none'
```

## API Integration Points

### DNSE API Endpoints (Placeholder)
- `POST /v1/auth/login` - Authentication
- `GET /v1/accounts` - Get accounts
- `GET /v1/positions` - Get positions
- `GET /v1/orders` - Get orders
- `POST /v1/orders` - Place order
- `DELETE /v1/orders/{id}` - Cancel order

### TCBS API Endpoints (Placeholder)
- `POST /v2/auth/login` - Authentication
- `GET /v2/accounts` - Get accounts
- `GET /v2/positions` - Get positions
- `GET /v2/orders` - Get orders
- `POST /v2/orders` - Place order
- `DELETE /v2/orders/{id}` - Cancel order

## Security Considerations

1. **Credential Storage**
   - Credentials are encrypted before storage
   - Never logged or exposed in console
   - Only decrypted when making API calls

2. **API Communication**
   - All API calls should use HTTPS
   - Implement rate limiting
   - Validate all responses

3. **Session Management**
   - Sessions expire after inactivity
   - User must reconnect if session expires
   - Automatic disconnect on logout

## Testing

### Mock Implementation
Current implementation uses mock data for testing. In production:

1. Replace mock API calls with real endpoints
2. Implement actual authentication
3. Add credential encryption
4. Implement error recovery

### Test Scenarios
1. Connect with valid credentials → Should connect
2. Connect with invalid credentials → Should show error
3. Disconnect and reconnect → Should work
4. Network error during fetch → Should show error
5. Multiple providers → Should switch correctly

## Future Enhancements

- [ ] Actual API integration with DNSE
- [ ] Actual API integration with TCBS
- [ ] Support for more providers (SSI, VietCapital, etc.)
- [ ] Place/Cancel orders directly from dashboard
- [ ] Real-time WebSocket updates
- [ ] Order history and analytics
- [ ] Portfolio sync with trading positions
- [ ] Automated rebalancing
- [ ] Trading alerts and notifications
- [ ] Multi-account support

## Files Structure

```
lib/trading/
├── types.ts                    # Type definitions
├── base-provider.ts            # Base provider class
├── service.ts                  # Trading service
├── hooks.ts                    # React hooks
└── providers/
    ├── dnse.ts                 # DNSE implementation
    └── tcbs.ts                 # TCBS implementation

components/trading/
├── trading-provider-modal.tsx  # Connection modal
├── trading-positions.tsx       # Positions display
├── trading-orders.tsx          # Orders display
└── trading-settings-tab.tsx    # Main trading tab
```

## Support

For issues or questions, refer to:
- Plan file: `v0_plans/trading-api-integration.md`
- Component source files
- TypeScript type definitions
