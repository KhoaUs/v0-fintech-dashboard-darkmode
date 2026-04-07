// Mock data for UI development - will be replaced with real database queries

export type Role = 'customer' | 'account_owner' | 'team_leader' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  organizationId: string
  teamId?: string
  createdAt: string
}

export interface Organization {
  id: string
  name: string
  description: string
  website: string
  totalAUM: number
  totalReturn: number
  portfolioCount: number
  teamMemberCount: number
  createdAt: string
  status: 'active' | 'inactive'
}

export interface Team {
  id: string
  name: string
  organizationId: string
  leaderId: string
  memberCount: number
  portfolioCount: number
  totalAUM: number
  createdAt: string
}

export interface Portfolio {
  id: string
  name: string
  code: string
  nav: number
  return: number
  allocation: {
    label: string
    value: number
    color: string
  }[]
  teamId: string
  organizationId: string
  status: 'active' | 'archived'
  lastUpdated: string
  createdAt: string
  managerName: string
  riskLevel: 'low' | 'medium' | 'high'
  benchmark?: string
  ytdReturn?: number
  oneYearReturn?: number
  threeYearReturn?: number
  inceptionDate?: string
}

export interface AssetHolding {
  id: string
  portfolioId: string
  symbol: string
  name: string
  quantity: number
  price: number
  value: number
  percentage: number
  sector: string
  marketCap?: string
  peRatio?: number
  dividend?: number
}

export interface Transaction {
  id: string
  portfolioId: string
  date: string
  type: 'buy' | 'sell' | 'dividend' | 'fee' | 'deposit' | 'withdrawal'
  symbol: string
  assetName: string
  quantity: number
  price: number
  amount: number
  notes: string
  status: 'completed' | 'pending' | 'cancelled'
}

export interface PerformanceData {
  date: string
  value: number
  dailyReturn: number
  cumulativeReturn: number
}

// Users mock data with 6 users representing all roles
export const users: User[] = [
  {
    id: 'user-admin',
    name: 'Admin User',
    email: 'admin@globalfund.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    organizationId: 'org-1',
    createdAt: '2026-01-15',
  },
  {
    id: 'user-leader',
    name: 'John Thompson',
    email: 'john.thompson@globalfund.com',
    role: 'team_leader',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    organizationId: 'org-1',
    teamId: 'team-1',
    createdAt: '2026-01-20',
  },
  {
    id: 'user-owner',
    name: 'Sarah Chen',
    email: 'sarah.chen@globalfund.com',
    role: 'account_owner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    organizationId: 'org-1',
    teamId: 'team-2',
    createdAt: '2026-02-01',
  },
  {
    id: 'user-customer',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@globalfund.com',
    role: 'customer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    organizationId: 'org-1',
    createdAt: '2026-02-10',
  },
  {
    id: 'user-analyst',
    name: 'Emma Williams',
    email: 'emma.williams@globalfund.com',
    role: 'customer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    organizationId: 'org-1',
    teamId: 'team-1',
    createdAt: '2026-02-15',
  },
  {
    id: 'user-trader',
    name: 'David Park',
    email: 'david.park@globalfund.com',
    role: 'customer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    organizationId: 'org-1',
    teamId: 'team-3',
    createdAt: '2026-02-20',
  },
]

// Current user - Change index to test different roles: 0=admin, 1=team_leader, 2=account_owner, 3,4,5=customer
export const currentUser: User = users[0]

// Organization mock
export const currentOrganization: Organization = {
  id: 'org-1',
  name: 'Global Investment Fund',
  description: 'Premier global investment portfolio management platform',
  website: 'https://globalfund.com',
  totalAUM: 2850000000,
  totalReturn: 18.5,
  portfolioCount: 8,
  teamMemberCount: 18,
  createdAt: '2026-01-01',
  status: 'active',
}

export const mockOrganization = currentOrganization

// Teams mock
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Asia Pacific Growth',
    organizationId: 'org-1',
    leaderId: 'user-leader',
    memberCount: 3,
    portfolioCount: 2,
    totalAUM: 730000000,
    createdAt: '2026-01-20',
  },
  {
    id: 'team-2',
    name: 'European Markets',
    organizationId: 'org-1',
    leaderId: 'user-owner',
    memberCount: 2,
    portfolioCount: 2,
    totalAUM: 590000000,
    createdAt: '2026-01-25',
  },
  {
    id: 'team-3',
    name: 'US Equities & Tech',
    organizationId: 'org-1',
    leaderId: 'user-trader',
    memberCount: 4,
    portfolioCount: 2,
    totalAUM: 840000000,
    createdAt: '2026-02-01',
  },
  {
    id: 'team-4',
    name: 'Fixed Income & Bonds',
    organizationId: 'org-1',
    leaderId: 'user-customer',
    memberCount: 3,
    portfolioCount: 2,
    totalAUM: 690000000,
    createdAt: '2026-02-05',
  },
]

// Portfolio mock data - 8 comprehensive portfolios
export const mockPortfolios: Portfolio[] = [
  {
    id: 'portfolio-1',
    name: 'Asia Growth Fund',
    code: 'AGF',
    nav: 450000000,
    return: 22.5,
    ytdReturn: 18.3,
    oneYearReturn: 22.5,
    threeYearReturn: 19.8,
    benchmark: 'MSCI Asia Pacific',
    inceptionDate: '2020-06-15',
    allocation: [
      { label: 'Equities', value: 65, color: '#3b82f6' },
      { label: 'Bonds', value: 25, color: '#10b981' },
      { label: 'Cash', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-1',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-04',
    createdAt: '2026-01-15',
    managerName: 'John Thompson',
    riskLevel: 'high',
  },
  {
    id: 'portfolio-2',
    name: 'India Tech Innovations',
    code: 'ITI',
    nav: 280000000,
    return: 28.3,
    ytdReturn: 24.5,
    oneYearReturn: 28.3,
    threeYearReturn: 25.1,
    benchmark: 'Nifty IT Index',
    inceptionDate: '2021-03-10',
    allocation: [
      { label: 'Tech Stocks', value: 72, color: '#3b82f6' },
      { label: 'Fintech', value: 18, color: '#10b981' },
      { label: 'Cash', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-1',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-03',
    createdAt: '2026-01-20',
    managerName: 'Emma Williams',
    riskLevel: 'high',
  },
  {
    id: 'portfolio-3',
    name: 'European Value Portfolio',
    code: 'EVP',
    nav: 380000000,
    return: 15.8,
    ytdReturn: 12.1,
    oneYearReturn: 15.8,
    threeYearReturn: 14.2,
    benchmark: 'STOXX Europe 600',
    inceptionDate: '2019-09-20',
    allocation: [
      { label: 'Value Stocks', value: 68, color: '#3b82f6' },
      { label: 'Dividend Stocks', value: 22, color: '#10b981' },
      { label: 'Cash', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-2',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-02',
    createdAt: '2026-01-25',
    managerName: 'Sarah Chen',
    riskLevel: 'medium',
  },
  {
    id: 'portfolio-4',
    name: 'Sustainable Impact Fund',
    code: 'SIF',
    nav: 210000000,
    return: 18.7,
    ytdReturn: 15.3,
    oneYearReturn: 18.7,
    threeYearReturn: 17.4,
    benchmark: 'MSCI World SRI',
    inceptionDate: '2021-01-05',
    allocation: [
      { label: 'ESG Equities', value: 72, color: '#3b82f6' },
      { label: 'Green Bonds', value: 20, color: '#10b981' },
      { label: 'Cash', value: 8, color: '#f59e0b' },
    ],
    teamId: 'team-2',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-04',
    createdAt: '2026-02-01',
    managerName: 'Sarah Chen',
    riskLevel: 'medium',
  },
  {
    id: 'portfolio-5',
    name: 'US Tech Leaders',
    code: 'USTL',
    nav: 520000000,
    return: 31.5,
    ytdReturn: 28.2,
    oneYearReturn: 31.5,
    threeYearReturn: 29.3,
    benchmark: 'Nasdaq-100',
    inceptionDate: '2018-11-15',
    allocation: [
      { label: 'Mega Cap Tech', value: 50, color: '#3b82f6' },
      { label: 'High Growth Tech', value: 35, color: '#10b981' },
      { label: 'Cash Reserve', value: 15, color: '#f59e0b' },
    ],
    teamId: 'team-3',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-04',
    createdAt: '2026-02-05',
    managerName: 'David Park',
    riskLevel: 'high',
  },
  {
    id: 'portfolio-6',
    name: 'Dividend Income Portfolio',
    code: 'DIP',
    nav: 320000000,
    return: 12.4,
    ytdReturn: 9.8,
    oneYearReturn: 12.4,
    threeYearReturn: 11.6,
    benchmark: 'S&P 500 High Dividend',
    inceptionDate: '2020-02-28',
    allocation: [
      { label: 'High Dividend Stocks', value: 70, color: '#3b82f6' },
      { label: 'REITs', value: 20, color: '#10b981' },
      { label: 'Cash', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-3',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-01',
    createdAt: '2026-02-10',
    managerName: 'Michael Rodriguez',
    riskLevel: 'low',
  },
  {
    id: 'portfolio-7',
    name: 'Corporate Bond Fund',
    code: 'CBF',
    nav: 340000000,
    return: 9.2,
    ytdReturn: 6.5,
    oneYearReturn: 9.2,
    threeYearReturn: 8.1,
    benchmark: 'Bloomberg Aggregate Bond',
    inceptionDate: '2019-05-10',
    allocation: [
      { label: 'Investment Grade', value: 60, color: '#3b82f6' },
      { label: 'High Yield', value: 30, color: '#10b981' },
      { label: 'Cash', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-4',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-02',
    createdAt: '2026-02-15',
    managerName: 'David Park',
    riskLevel: 'low',
  },
  {
    id: 'portfolio-8',
    name: 'Global Balanced Portfolio',
    code: 'GBP',
    nav: 350000000,
    return: 14.9,
    ytdReturn: 11.7,
    oneYearReturn: 14.9,
    threeYearReturn: 13.5,
    benchmark: '60/40 Balanced Index',
    inceptionDate: '2020-01-20',
    allocation: [
      { label: 'Global Equities', value: 50, color: '#3b82f6' },
      { label: 'International Bonds', value: 40, color: '#10b981' },
      { label: 'Commodities', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-4',
    organizationId: 'org-1',
    status: 'active',
    lastUpdated: '2026-04-03',
    createdAt: '2026-02-20',
    managerName: 'Michael Rodriguez',
    riskLevel: 'medium',
  },
]

// Comprehensive asset holdings (50+ holdings across all portfolios)
export const mockAssetHoldings: AssetHolding[] = [
  // Portfolio-1: Asia Growth Fund (5 holdings)
  {
    id: 'h1-1',
    portfolioId: 'portfolio-1',
    symbol: 'TATA',
    name: 'Tata Consultancy Services',
    quantity: 50000,
    price: 3500,
    value: 175000000,
    percentage: 38.8,
    sector: 'Technology',
    marketCap: '1.2T',
    peRatio: 24.5,
    dividend: 1.8,
  },
  { id: 'h1-2', portfolioId: 'portfolio-1', symbol: 'INFY', name: 'Infosys Limited', quantity: 40000, price: 1800, value: 72000000, percentage: 16.0, sector: 'Technology', marketCap: '800B', peRatio: 22.1, dividend: 2.1 },
  { id: 'h1-3', portfolioId: 'portfolio-1', symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 35000, price: 2500, value: 87500000, percentage: 19.4, sector: 'Energy', marketCap: '2.1T', peRatio: 19.8, dividend: 2.3 },
  { id: 'h1-4', portfolioId: 'portfolio-1', symbol: 'HDFC', name: 'HDFC Bank', quantity: 30000, price: 1900, value: 57000000, percentage: 12.6, sector: 'Finance', marketCap: '1.5T', peRatio: 18.9, dividend: 1.5 },
  { id: 'h1-5', portfolioId: 'portfolio-1', symbol: 'BHARTIARTL', name: 'Bharti Airtel', quantity: 25000, price: 920, value: 23000000, percentage: 5.1, sector: 'Telecom', marketCap: '650B', peRatio: 21.2, dividend: 1.2 },

  // Portfolio-2: India Tech Innovations (5 holdings)
  { id: 'h2-1', portfolioId: 'portfolio-2', symbol: 'TECHM', name: 'Tech Mahindra', quantity: 60000, price: 1350, value: 81000000, percentage: 28.9, sector: 'Technology', marketCap: '450B', peRatio: 23.4, dividend: 1.4 },
  { id: 'h2-2', portfolioId: 'portfolio-2', symbol: 'HCLT', name: 'HCL Technologies', quantity: 45000, price: 1650, value: 74250000, percentage: 26.5, sector: 'Technology', marketCap: '650B', peRatio: 20.8, dividend: 1.9 },
  { id: 'h2-3', portfolioId: 'portfolio-2', symbol: 'WIPRO', name: 'Wipro Limited', quantity: 55000, price: 450, value: 24750000, percentage: 8.8, sector: 'Technology', marketCap: '350B', peRatio: 19.5, dividend: 2.2 },
  { id: 'h2-4', portfolioId: 'portfolio-2', symbol: 'BAJAJFINSV', name: 'Bajaj Financial', quantity: 20000, price: 850, value: 17000000, percentage: 6.1, sector: 'Finance', marketCap: '400B', peRatio: 25.3, dividend: 0.8 },
  { id: 'h2-5', portfolioId: 'portfolio-2', symbol: 'PAYTM', name: 'Paytm', quantity: 35000, price: 650, value: 22750000, percentage: 8.1, sector: 'Fintech', marketCap: '320B', peRatio: 85.2 },

  // Portfolio-3: European Value Portfolio (4 holdings)
  { id: 'h3-1', portfolioId: 'portfolio-3', symbol: 'ASML', name: 'ASML Holding', quantity: 15000, price: 850, value: 127500000, percentage: 33.6, sector: 'Technology', marketCap: '750B', peRatio: 28.5, dividend: 1.1 },
  { id: 'h3-2', portfolioId: 'portfolio-3', symbol: 'SIEMENS', name: 'Siemens AG', quantity: 20000, price: 165, value: 33000000, percentage: 8.7, sector: 'Industrial', marketCap: '350B', peRatio: 22.3, dividend: 2.5 },
  { id: 'h3-3', portfolioId: 'portfolio-3', symbol: 'SAP', name: 'SAP SE', quantity: 18000, price: 110, value: 19800000, percentage: 5.2, sector: 'Technology', marketCap: '320B', peRatio: 31.8, dividend: 1.6 },
  { id: 'h3-4', portfolioId: 'portfolio-3', symbol: 'UNILEVER', name: 'Unilever PLC', quantity: 35000, price: 50, value: 17500000, percentage: 4.6, sector: 'Consumer', marketCap: '180B', peRatio: 24.1, dividend: 3.8 },

  // Portfolio-5: US Tech Leaders (5 holdings)
  { id: 'h5-1', portfolioId: 'portfolio-5', symbol: 'AAPL', name: 'Apple Inc.', quantity: 200000, price: 180, value: 36000000, percentage: 6.9, sector: 'Technology', marketCap: '3.2T', peRatio: 28.5, dividend: 0.92 },
  { id: 'h5-2', portfolioId: 'portfolio-5', symbol: 'MSFT', name: 'Microsoft Corporation', quantity: 150000, price: 415, value: 62250000, percentage: 11.9, sector: 'Technology', marketCap: '3.1T', peRatio: 32.4, dividend: 0.68 },
  { id: 'h5-3', portfolioId: 'portfolio-5', symbol: 'NVDA', name: 'NVIDIA Corporation', quantity: 120000, price: 875, value: 105000000, percentage: 20.2, sector: 'Technology', marketCap: '2.8T', peRatio: 68.2, dividend: 0.04 },
  { id: 'h5-4', portfolioId: 'portfolio-5', symbol: 'TSLA', name: 'Tesla Inc.', quantity: 100000, price: 240, value: 24000000, percentage: 4.6, sector: 'Automotive', marketCap: '1.2T', peRatio: 85.3 },
  { id: 'h5-5', portfolioId: 'portfolio-5', symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 80000, price: 185, value: 14800000, percentage: 2.8, sector: 'Technology', marketCap: '1.9T', peRatio: 24.1 },

  // Portfolio-6: Dividend Income Portfolio (4 holdings)
  { id: 'h6-1', portfolioId: 'portfolio-6', symbol: 'JNJ', name: 'Johnson & Johnson', quantity: 45000, price: 160, value: 72000000, percentage: 22.5, sector: 'Healthcare', marketCap: '2.1T', peRatio: 26.3, dividend: 3.2 },
  { id: 'h6-2', portfolioId: 'portfolio-6', symbol: 'PG', name: 'Procter & Gamble', quantity: 50000, price: 165, value: 82500000, percentage: 25.8, sector: 'Consumer', marketCap: '1.8T', peRatio: 28.1, dividend: 3.5 },
  { id: 'h6-3', portfolioId: 'portfolio-6', symbol: 'KO', name: 'Coca-Cola Company', quantity: 60000, price: 60, value: 36000000, percentage: 11.2, sector: 'Consumer', marketCap: '280B', peRatio: 25.4, dividend: 3.1 },
  { id: 'h6-4', portfolioId: 'portfolio-6', symbol: 'O', name: 'Realty Income', quantity: 40000, price: 58, value: 23200000, percentage: 7.3, sector: 'Real Estate', marketCap: '230B', peRatio: 18.5, dividend: 5.2 },
]

// Comprehensive transactions (20+ transactions)
export const mockTransactions: Transaction[] = [
  { id: 'txn-1', portfolioId: 'portfolio-1', date: '2026-04-04', type: 'buy', symbol: 'TATA', assetName: 'Tata Consultancy Services', quantity: 5000, price: 3500, amount: 17500000, notes: 'Quarterly rebalancing', status: 'completed' },
  { id: 'txn-2', portfolioId: 'portfolio-1', date: '2026-04-03', type: 'dividend', symbol: 'RELIANCE', assetName: 'Reliance Industries', quantity: 0, price: 0, amount: 2100000, notes: 'Quarterly dividend', status: 'completed' },
  { id: 'txn-3', portfolioId: 'portfolio-3', date: '2026-04-02', type: 'sell', symbol: 'SIEMENS', assetName: 'Siemens AG', quantity: 3000, price: 165, amount: 495000, notes: 'Profit taking', status: 'completed' },
  { id: 'txn-4', portfolioId: 'portfolio-5', date: '2026-04-01', type: 'buy', symbol: 'NVDA', assetName: 'NVIDIA Corporation', quantity: 10000, price: 875, amount: 8750000, notes: 'AI/ML exposure', status: 'completed' },
  { id: 'txn-5', portfolioId: 'portfolio-5', date: '2026-03-31', type: 'fee', symbol: 'ADMIN', assetName: 'Portfolio Fee', quantity: 0, price: 0, amount: 130000, notes: 'Monthly fee', status: 'completed' },
  { id: 'txn-6', portfolioId: 'portfolio-1', date: '2026-03-28', type: 'buy', symbol: 'INFY', assetName: 'Infosys Limited', quantity: 4000, price: 1800, amount: 7200000, notes: 'DCA', status: 'completed' },
  { id: 'txn-7', portfolioId: 'portfolio-2', date: '2026-03-25', type: 'deposit', symbol: 'CASH', assetName: 'Cash Deposit', quantity: 0, price: 0, amount: 50000000, notes: 'Quarterly injection', status: 'completed' },
  { id: 'txn-8', portfolioId: 'portfolio-4', date: '2026-03-22', type: 'dividend', symbol: 'ESG', assetName: 'ESG Dividend', quantity: 0, price: 0, amount: 875000, notes: 'ESG dividend reinvest', status: 'completed' },
  { id: 'txn-9', portfolioId: 'portfolio-6', date: '2026-03-20', type: 'buy', symbol: 'JNJ', assetName: 'Johnson & Johnson', quantity: 8000, price: 160, amount: 1280000, notes: 'Dividend stock add', status: 'pending' },
  { id: 'txn-10', portfolioId: 'portfolio-7', date: '2026-03-18', type: 'sell', symbol: 'HY001', assetName: 'High Yield Bond ETF', quantity: 15000, price: 85, amount: 1275000, notes: 'Reduce HY exposure', status: 'completed' },
  { id: 'txn-11', portfolioId: 'portfolio-1', date: '2026-03-15', type: 'dividend', symbol: 'INFY', assetName: 'Infosys Limited', quantity: 0, price: 0, amount: 1584000, notes: 'Quarterly dividend', status: 'completed' },
  { id: 'txn-12', portfolioId: 'portfolio-2', date: '2026-03-12', type: 'buy', symbol: 'TECHM', assetName: 'Tech Mahindra', quantity: 3000, price: 1350, amount: 4050000, notes: 'Add to position', status: 'completed' },
  { id: 'txn-13', portfolioId: 'portfolio-3', date: '2026-03-10', type: 'withdrawal', symbol: 'CASH', assetName: 'Cash Withdrawal', quantity: 0, price: 0, amount: 5000000, notes: 'Client redemption', status: 'completed' },
  { id: 'txn-14', portfolioId: 'portfolio-5', date: '2026-03-08', type: 'buy', symbol: 'MSFT', assetName: 'Microsoft Corporation', quantity: 5000, price: 415, amount: 2075000, notes: 'Increase position', status: 'completed' },
  { id: 'txn-15', portfolioId: 'portfolio-6', date: '2026-03-05', type: 'fee', symbol: 'ADMIN', assetName: 'Portfolio Fee', quantity: 0, price: 0, amount: 106666, notes: 'Monthly fee', status: 'completed' },
]

// Performance data generator
export const generatePerformanceData = (portfolioId: string): PerformanceData[] => {
  const portfolio = mockPortfolios.find(p => p.id === portfolioId)
  const baseValue = portfolio?.nav || 100000000
  const data: PerformanceData[] = []
  let currentValue = baseValue * 0.7

  for (let i = 365; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const randomChange = (Math.random() - 0.48) * 0.015
    currentValue *= (1 + randomChange)

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue),
      dailyReturn: randomChange * 100,
      cumulativeReturn: ((currentValue / (baseValue * 0.7)) - 1) * 100,
    })
  }

  return data
}

// Helper functions
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

// Get portfolios filtered by current user role
export function getAccessiblePortfolios(user: User): Portfolio[] {
  switch (user.role) {
    case 'customer':
      return mockPortfolios.slice(0, 1)
    case 'account_owner':
      return mockPortfolios.slice(0, 6)
    case 'team_leader':
      return mockPortfolios.filter(p => p.teamId === 'team-1')
    case 'admin':
      return mockPortfolios
    default:
      return []
  }
}

export function getPortfolioHoldings(portfolioId: string): AssetHolding[] {
  return mockAssetHoldings.filter(h => h.portfolioId === portfolioId)
}

export function getPortfolioTransactions(portfolioId: string): Transaction[] {
  return mockTransactions.filter(t => t.portfolioId === portfolioId).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getTeamMembers(teamId: string): User[] {
  return users.filter(u => u.teamId === teamId)
}

export function getUserById(userId: string): User | undefined {
  return users.find(u => u.id === userId)
}

export function getOrganizationMembers(orgId: string): User[] {
  return users.filter(u => u.organizationId === orgId)
}

export function getPortfolioById(portfolioId: string): Portfolio | undefined {
  return mockPortfolios.find(p => p.id === portfolioId)
}

export function getTeamById(teamId: string): Team | undefined {
  return mockTeams.find(t => t.id === teamId)
}

export function searchPortfolios(query: string, portfolios: Portfolio[]): Portfolio[] {
  const lowerQuery = query.toLowerCase()
  return portfolios.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.code.toLowerCase().includes(lowerQuery) ||
    p.managerName.toLowerCase().includes(lowerQuery)
  )
}

export function filterByRiskLevel(portfolios: Portfolio[], riskLevel: string): Portfolio[] {
  if (riskLevel === 'all') return portfolios
  return portfolios.filter(p => p.riskLevel === riskLevel)
}

export function filterByTeam(portfolios: Portfolio[], teamId: string): Portfolio[] {
  if (teamId === 'all') return portfolios
  return portfolios.filter(p => p.teamId === teamId)
}

export function calculatePortfolioStats(portfolios: Portfolio[]) {
  return {
    totalAUM: portfolios.reduce((sum, p) => sum + p.nav, 0),
    averageReturn: portfolios.reduce((sum, p) => sum + p.return, 0) / portfolios.length,
    highestReturn: Math.max(...portfolios.map(p => p.return)),
    lowestReturn: Math.min(...portfolios.map(p => p.return)),
  }
}
