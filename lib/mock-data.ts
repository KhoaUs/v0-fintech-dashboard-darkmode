// Mock data for UI development - will be replaced with real database queries

export type Role = 'customer' | 'account_owner' | 'team_leader' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

export interface Organization {
  id: string
  name: string
  description: string
  totalAUM: number
  totalReturn: number
  portfolioCount: number
  teamMemberCount: number
}

export interface Team {
  id: string
  name: string
  leaderId: string
  memberCount: number
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
  status: 'active' | 'archived'
  lastUpdated: string
}

// Current user mock
export const currentUser: User = {
  id: 'user-1',
  name: 'Khoa Nguyễn',
  email: 'khoa@fintech.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khoa',
}

// Organization mock
export const mockOrganization: Organization = {
  id: 'org-1',
  name: 'Global Investment Fund',
  description: 'Premier global investment portfolio management platform',
  totalAUM: 2850000000,
  totalReturn: 18.5,
  portfolioCount: 12,
  teamMemberCount: 24,
}

// Teams mock
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Asia Pacific',
    leaderId: 'user-2',
    memberCount: 6,
  },
  {
    id: 'team-2',
    name: 'European Markets',
    leaderId: 'user-3',
    memberCount: 5,
  },
  {
    id: 'team-3',
    name: 'US Equities',
    leaderId: 'user-4',
    memberCount: 8,
  },
  {
    id: 'team-4',
    name: 'Fixed Income',
    leaderId: 'user-5',
    memberCount: 5,
  },
]

// Portfolio mock data
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
    status: 'active',
    lastUpdated: '2026-04-04',
  },
  {
    id: 'portfolio-2',
    name: 'European Value Portfolio',
    code: 'EVP',
    nav: 380000000,
    return: 15.8,
    allocation: [
      { label: 'Equities', value: 70, color: '#3b82f6' },
      { label: 'Bonds', value: 20, color: '#10b981' },
      { label: 'Alternatives', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-2',
    status: 'active',
    lastUpdated: '2026-04-03',
  },
  {
    id: 'portfolio-3',
    name: 'US Tech Leaders',
    code: 'USTL',
    nav: 520000000,
    return: 28.3,
    allocation: [
      { label: 'Tech Equities', value: 75, color: '#3b82f6' },
      { label: 'Growth Stocks', value: 20, color: '#10b981' },
      { label: 'Cash Reserve', value: 5, color: '#f59e0b' },
    ],
    teamId: 'team-3',
    status: 'active',
    lastUpdated: '2026-04-04',
  },
  {
    id: 'portfolio-4',
    name: 'Corporate Bond Fund',
    code: 'CBF',
    nav: 320000000,
    return: 9.2,
    allocation: [
      { label: 'Investment Grade', value: 60, color: '#3b82f6' },
      { label: 'High Yield', value: 30, color: '#10b981' },
      { label: 'Cash', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-4',
    status: 'active',
    lastUpdated: '2026-04-02',
  },
  {
    id: 'portfolio-5',
    name: 'Emerging Markets Fund',
    code: 'EMF',
    nav: 280000000,
    return: 31.5,
    allocation: [
      { label: 'Emerging Equities', value: 80, color: '#3b82f6' },
      { label: 'Local Bonds', value: 15, color: '#10b981' },
      { label: 'Cash', value: 5, color: '#f59e0b' },
    ],
    teamId: 'team-1',
    status: 'active',
    lastUpdated: '2026-04-04',
  },
  {
    id: 'portfolio-6',
    name: 'Dividend Income Portfolio',
    code: 'DIP',
    nav: 410000000,
    return: 12.4,
    allocation: [
      { label: 'High Dividend Stocks', value: 70, color: '#3b82f6' },
      { label: 'REITs', value: 20, color: '#10b981' },
      { label: 'Utilities', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-3',
    status: 'active',
    lastUpdated: '2026-04-01',
  },
  {
    id: 'portfolio-7',
    name: 'Sustainable Impact Fund',
    code: 'SIF',
    nav: 195000000,
    return: 18.7,
    allocation: [
      { label: 'ESG Equities', value: 72, color: '#3b82f6' },
      { label: 'Green Bonds', value: 20, color: '#10b981' },
      { label: 'Cash', value: 8, color: '#f59e0b' },
    ],
    teamId: 'team-2',
    status: 'active',
    lastUpdated: '2026-04-04',
  },
  {
    id: 'portfolio-8',
    name: 'Global Balanced Portfolio',
    code: 'GBP',
    nav: 295000000,
    return: 14.9,
    allocation: [
      { label: 'Global Equities', value: 60, color: '#3b82f6' },
      { label: 'International Bonds', value: 30, color: '#10b981' },
      { label: 'Commodities', value: 10, color: '#f59e0b' },
    ],
    teamId: 'team-4',
    status: 'active',
    lastUpdated: '2026-04-03',
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
      // Customers see only portfolios they own
      return mockPortfolios.slice(0, 1)
    case 'account_owner':
      // Account owners see portfolios in their organization
      return mockPortfolios.slice(0, 6)
    case 'team_leader':
      // Team leaders see their team's portfolios
      return mockPortfolios.filter(p => p.teamId === 'team-1')
    case 'admin':
      // Admins see all portfolios
      return mockPortfolios
    default:
      return []
  }
}
