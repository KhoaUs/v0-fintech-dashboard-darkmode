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
}

export interface Transaction {
  id: string
  portfolioId: string
  date: string
  type: 'buy' | 'sell' | 'dividend' | 'fee'
  symbol: string
  assetName: string
  quantity: number
  price: number
  amount: number
  notes: string
}

// Users mock data with 4 role types
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
]

// Current user - Change the index to test different roles
// 0 = admin, 1 = team_leader, 2 = account_owner, 3 = customer
export const currentUser: User = users[0]

// Organization mock - Main organization
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

// Teams mock - 4 teams with different focus areas
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Asia Pacific Growth',
    organizationId: 'org-1',
    leaderId: 'user-leader',
    memberCount: 5,
    portfolioCount: 2,
    totalAUM: 730000000,
    createdAt: '2026-01-20',
  },
  {
    id: 'team-2',
    name: 'European Markets',
    organizationId: 'org-1',
    leaderId: 'user-owner',
    memberCount: 4,
    portfolioCount: 2,
    totalAUM: 590000000,
    createdAt: '2026-01-25',
  },
  {
    id: 'team-3',
    name: 'US Equities & Tech',
    organizationId: 'org-1',
    leaderId: 'user-customer',
    memberCount: 6,
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

// Portfolio mock data - 8 portfolios across teams
export const mockPortfolios: Portfolio[] = [
  {
    id: 'portfolio-1',
    name: 'Asia Growth Fund',
    code: 'AGF',
    nav: 450000000,
    return: 22.5,
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
    managerName: 'John Thompson',
    riskLevel: 'high',
  },
  {
    id: 'portfolio-3',
    name: 'European Value Portfolio',
    code: 'EVP',
    nav: 380000000,
    return: 15.8,
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
    managerName: 'Michael Rodriguez',
    riskLevel: 'high',
  },
  {
    id: 'portfolio-6',
    name: 'Dividend Income Portfolio',
    code: 'DIP',
    nav: 320000000,
    return: 12.4,
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
    managerName: 'Michael Rodriguez',
    riskLevel: 'low',
  },
  {
    id: 'portfolio-8',
    name: 'Global Balanced Portfolio',
    code: 'GBP',
    nav: 350000000,
    return: 14.9,
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

// Asset Holdings mock - Sample holdings in each portfolio
export const mockAssetHoldings: AssetHolding[] = [
  // Portfolio-1: Asia Growth Fund
  {
    id: 'holding-1',
    portfolioId: 'portfolio-1',
    symbol: 'TATA',
    name: 'Tata Consultancy Services',
    quantity: 50000,
    price: 3500,
    value: 175000000,
    percentage: 38.8,
    sector: 'Technology',
  },
  {
    id: 'holding-2',
    portfolioId: 'portfolio-1',
    symbol: 'INFY',
    name: 'Infosys Limited',
    quantity: 40000,
    price: 1800,
    value: 72000000,
    percentage: 16.0,
    sector: 'Technology',
  },
  {
    id: 'holding-3',
    portfolioId: 'portfolio-1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 35000,
    price: 2500,
    value: 87500000,
    percentage: 19.4,
    sector: 'Energy',
  },
  {
    id: 'holding-4',
    portfolioId: 'portfolio-1',
    symbol: 'HDFC',
    name: 'HDFC Bank',
    quantity: 30000,
    price: 1900,
    value: 57000000,
    percentage: 12.6,
    sector: 'Finance',
  },
  {
    id: 'holding-5',
    portfolioId: 'portfolio-1',
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel',
    quantity: 25000,
    price: 920,
    value: 23000000,
    percentage: 5.1,
    sector: 'Telecom',
  },
  // Portfolio-3: European Value Portfolio
  {
    id: 'holding-6',
    portfolioId: 'portfolio-3',
    symbol: 'ASML',
    name: 'ASML Holding',
    quantity: 15000,
    price: 850,
    value: 127500000,
    percentage: 33.6,
    sector: 'Technology',
  },
  {
    id: 'holding-7',
    portfolioId: 'portfolio-3',
    symbol: 'SIEMENS',
    name: 'Siemens AG',
    quantity: 20000,
    price: 165,
    value: 33000000,
    percentage: 8.7,
    sector: 'Industrial',
  },
  {
    id: 'holding-8',
    portfolioId: 'portfolio-3',
    symbol: 'SAP',
    name: 'SAP SE',
    quantity: 18000,
    price: 110,
    value: 19800000,
    percentage: 5.2,
    sector: 'Technology',
  },
  {
    id: 'holding-9',
    portfolioId: 'portfolio-3',
    symbol: 'UNILEVER',
    name: 'Unilever PLC',
    quantity: 35000,
    price: 50,
    value: 17500000,
    percentage: 4.6,
    sector: 'Consumer',
  },
  // Portfolio-5: US Tech Leaders
  {
    id: 'holding-10',
    portfolioId: 'portfolio-5',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 200000,
    price: 180,
    value: 36000000,
    percentage: 6.9,
    sector: 'Technology',
  },
  {
    id: 'holding-11',
    portfolioId: 'portfolio-5',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 150000,
    price: 415,
    value: 62250000,
    percentage: 11.9,
    sector: 'Technology',
  },
  {
    id: 'holding-12',
    portfolioId: 'portfolio-5',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 120000,
    price: 875,
    value: 105000000,
    percentage: 20.2,
    sector: 'Technology',
  },
  {
    id: 'holding-13',
    portfolioId: 'portfolio-5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 100000,
    price: 240,
    value: 24000000,
    percentage: 4.6,
    sector: 'Automotive',
  },
  {
    id: 'holding-14',
    portfolioId: 'portfolio-5',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 80000,
    price: 185,
    value: 14800000,
    percentage: 2.8,
    sector: 'Technology',
  },
]

// Transactions mock
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    portfolioId: 'portfolio-1',
    date: '2026-04-04',
    type: 'buy',
    symbol: 'TATA',
    assetName: 'Tata Consultancy Services',
    quantity: 5000,
    price: 3500,
    amount: 17500000,
    notes: 'Quarterly rebalancing - increase tech exposure',
  },
  {
    id: 'txn-2',
    portfolioId: 'portfolio-1',
    date: '2026-04-03',
    type: 'dividend',
    symbol: 'RELIANCE',
    assetName: 'Reliance Industries',
    quantity: 0,
    price: 0,
    amount: 2100000,
    notes: 'Quarterly dividend payment',
  },
  {
    id: 'txn-3',
    portfolioId: 'portfolio-3',
    date: '2026-04-02',
    type: 'sell',
    symbol: 'SIEMENS',
    assetName: 'Siemens AG',
    quantity: 3000,
    price: 165,
    amount: 495000,
    notes: 'Profit taking - reduce industrial exposure',
  },
  {
    id: 'txn-4',
    portfolioId: 'portfolio-5',
    date: '2026-04-01',
    type: 'buy',
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    quantity: 10000,
    price: 875,
    amount: 8750000,
    notes: 'Increase AI/ML tech exposure',
  },
  {
    id: 'txn-5',
    portfolioId: 'portfolio-5',
    date: '2026-03-31',
    type: 'fee',
    symbol: 'ADMIN',
    assetName: 'Portfolio Management Fee',
    quantity: 0,
    price: 0,
    amount: 130000,
    notes: 'Monthly management fee (0.05% annualized)',
  },
  {
    id: 'txn-6',
    portfolioId: 'portfolio-1',
    date: '2026-03-28',
    type: 'buy',
    symbol: 'INFY',
    assetName: 'Infosys Limited',
    quantity: 4000,
    price: 1800,
    amount: 7200000,
    notes: 'Dollar cost averaging - monthly contribution',
  },
]

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
      // Customers see only 1 portfolio they own
      return mockPortfolios.slice(0, 1)
    case 'account_owner':
      // Account owners see portfolios in their organization (6 portfolios)
      return mockPortfolios.slice(0, 6)
    case 'team_leader':
      // Team leaders see their team's portfolios (2 portfolios from team-1)
      return mockPortfolios.filter(p => p.teamId === 'team-1')
    case 'admin':
      // Admins see all portfolios
      return mockPortfolios
    default:
      return []
  }
}

// Get asset holdings for a portfolio
export function getPortfolioHoldings(portfolioId: string): AssetHolding[] {
  return mockAssetHoldings.filter(h => h.portfolioId === portfolioId)
}

// Get transactions for a portfolio
export function getPortfolioTransactions(portfolioId: string): Transaction[] {
  return mockTransactions.filter(t => t.portfolioId === portfolioId).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

// Get team members
export function getTeamMembers(teamId: string): User[] {
  return users.filter(u => u.teamId === teamId)
}

// Get user by ID
export function getUserById(userId: string): User | undefined {
  return users.find(u => u.id === userId)
}

// Get organization members
export function getOrganizationMembers(orgId: string): User[] {
  return users.filter(u => u.organizationId === orgId)
}

