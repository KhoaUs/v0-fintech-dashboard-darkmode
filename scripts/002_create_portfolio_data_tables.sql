-- Migration: 002_create_portfolio_data_tables.sql
-- Description: Create tables for portfolio holdings, allocations, and transactions

-- Holdings table
CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  asset_name VARCHAR(255) NOT NULL,
  asset_type VARCHAR(100),
  -- Types: stock, bond, crypto, fund, cash, etc.
  quantity DECIMAL(20,8) NOT NULL,
  purchase_price DECIMAL(15,4) NOT NULL,
  current_price DECIMAL(15,4),
  currency VARCHAR(3) DEFAULT 'USD',
  purchase_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Allocation table (asset class allocation percentages)
CREATE TABLE allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  asset_class VARCHAR(100) NOT NULL,
  -- Classes: equities, bonds, cash, alternatives, etc.
  percentage DECIMAL(5,2) NOT NULL,
  color_code VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  holding_id UUID REFERENCES holdings(id) ON DELETE SET NULL,
  transaction_type VARCHAR(50) NOT NULL,
  -- Types: buy, sell, transfer_in, transfer_out, dividend, interest, fee
  quantity DECIMAL(20,8),
  price DECIMAL(15,4),
  total_amount DECIMAL(15,2),
  transaction_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Performance table
CREATE TABLE portfolio_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  performance_date DATE NOT NULL,
  nav DECIMAL(15,2) NOT NULL,
  daily_return DECIMAL(10,4),
  monthly_return DECIMAL(10,4),
  ytd_return DECIMAL(10,4),
  annual_return DECIMAL(10,4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(portfolio_id, performance_date)
);

-- Cash Flows table
CREATE TABLE cash_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  flow_type VARCHAR(50) NOT NULL,
  -- Types: contribution, withdrawal, dividend, interest, fee
  amount DECIMAL(15,2) NOT NULL,
  flow_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX idx_allocations_portfolio_id ON allocations(portfolio_id);
CREATE INDEX idx_transactions_portfolio_id ON transactions(portfolio_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_portfolio_performance_portfolio_id ON portfolio_performance(portfolio_id);
CREATE INDEX idx_portfolio_performance_date ON portfolio_performance(performance_date);
CREATE INDEX idx_cash_flows_portfolio_id ON cash_flows(portfolio_id);
CREATE INDEX idx_cash_flows_date ON cash_flows(flow_date);
