# Trading API Integration - Quick Start Guide

## What's New

Trading API integration allows you to connect DNSE or TCBS securities accounts directly to portfolios and view real-time positions and orders.

## Quick Start (2 minutes)

### 1. Open Portfolio Dashboard
- Click on any portfolio to open its dashboard
- You should see a new "Trading" tab

### 2. Connect Trading Account
- Click "Trading" tab
- Click "Connect Trading Account" button
- Select DNSE or TCBS
- Enter test credentials:
  - **Username**: any text (e.g., user@example.com)
  - **Password**: any text (e.g., password123)
- Click "Connect"

### 3. View Trading Data
After connecting, you'll see:
- **Positions Tab**: Your trading positions with gains/losses
- **Orders Tab**: Recent and pending orders

## Features Overview

### Positions Tab
Shows all open positions from your trading account:
- Stock symbol (FPT, VCB, HPG, ACB, BVH, CTG, MWG)
- Number of shares held
- Average purchase price
- Current market price
- Total portfolio value of that position
- Profit/loss amount and percentage

### Orders Tab
Shows recent trading orders:
- Date and time
- Stock symbol
- Buy or Sell order
- Order quantity and price
- Execution details
- Order status (Filled, Pending, Cancelled)

### Auto-Refresh
- Positions refresh every 30 seconds
- Orders refresh every 20 seconds
- Click refresh button for instant update

## Testing Scenarios

### Scenario 1: Connect DNSE
1. Open portfolio dashboard → Trading tab
2. Click "Connect Trading Account"
3. Select DNSE
4. Enter any username and password
5. Should see DNSE positions (FPT, VCB, HPG, etc.)

### Scenario 2: Connect TCBS
1. Same steps but select TCBS
2. Should see TCBS positions (ACB, BVH, CTG, MWG, etc.)

### Scenario 3: Switch Providers
1. Connect to DNSE
2. Click "Disconnect"
3. Connect to TCBS
4. Positions should change

### Scenario 4: Error Handling
1. Try to connect with empty credentials
2. Should show "Please fill all fields"
3. Wait during connection (shows loading spinner)

## Data Samples

### DNSE Positions
- FPT: 1,000 shares @ 72,100 VND (value: 72.1M, P&L: +5.26%)
- VCB: 500 shares @ 105,000 VND (value: 52.5M, P&L: +6.94%)
- HPG: 2,000 shares @ 38,200 VND (value: 76.4M, P&L: +6.70%)

### TCBS Positions
- ACB: 800 shares @ 30,200 VND (value: 24.16M, P&L: +5.96%)
- BVH: 300 shares @ 101,500 VND (value: 30.45M, P&L: +3.57%)
- CTG: 1,500 shares @ 26,800 VND (value: 40.2M, P&L: +4.69%)
- MWG: 600 shares @ 88,500 VND (value: 53.1M, P&L: +4.12%)

## Common Questions

**Q: Are these real trading accounts?**
A: No, this is a mock implementation for UI testing. In production, it will connect to real APIs.

**Q: Will my credentials be stored?**
A: No, credentials are only used for the current session and encrypted before any storage.

**Q: Can I place orders?**
A: The infrastructure is in place. Order placement UI will be added in next phase.

**Q: What providers are supported?**
A: Currently DNSE and TCBS. More providers can be added easily.

**Q: How often is data updated?**
A: Positions update every 30 seconds, orders every 20 seconds automatically.

## File Structure

```
Portfolio Dashboard → Trading Tab
                  ↓
         [Connect Button]
                  ↓
    [Provider Selection Modal]
                  ↓
    [DNSE / TCBS Credentials Form]
                  ↓
         [Connected State]
                  ↓
    ┌─────────────┴──────────────┐
    ↓                            ↓
[Positions Tab]          [Orders Tab]
- Summary stats          - Order stats
- Position table        - Orders table
- Refresh button        - Refresh button
```

## Troubleshooting

**Issue**: "Connection failed" error
- Make sure you entered username and password
- Check internet connection
- Try again

**Issue**: No positions showing
- Make sure provider is connected (green dot visible)
- Click "Refresh" button
- Wait for data to load (shows spinner)

**Issue**: Orders not updating
- Click "Refresh" in Orders tab
- Wait for auto-refresh (20 seconds)

## Next Steps

After testing trading features:
1. Review TRADING_API_INTEGRATION.md for technical details
2. Check provider implementations in lib/trading/providers/
3. Test real API integration when endpoints are ready
4. Add order placement UI in next phase

## Architecture

```
Trading Service
├── DNSE Provider
│   ├── getAccounts()
│   ├── getPositions()
│   └── getOrders()
├── TCBS Provider
│   ├── getAccounts()
│   ├── getPositions()
│   └── getOrders()
└── [Future: SSI, VietCapital, etc.]

React Components
├── TradingProviderModal (Connection UI)
├── TradingPositions (Display positions)
└── TradingOrders (Display orders)

React Hooks
├── useTradingConnection()
├── useTradingPositions()
└── useTradingOrders()
```

Enjoy testing the new trading features!
