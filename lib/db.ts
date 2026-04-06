import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface Organization {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface OrgMember {
  id: string
  user_id: string
  org_id: string
  role: 'customer' | 'account_owner' | 'team_leader' | 'admin'
  permissions: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  org_id: string
  name: string
  description: string | null
  leader_id: string | null
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  team_id: string
  name: string
  code: string
  description: string | null
  benchmark: string | null
  nav: number
  currency: string
  status: 'active' | 'archived' | 'suspended'
  created_at: string
  updated_at: string
}

// Organization queries
export async function getOrganization(org_id: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', org_id)
    .single()

  if (error) throw error
  return data as Organization
}

// User queries
export async function getUser(user_id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id)
    .single()

  if (error) throw error
  return data as User
}

// Organization members queries
export async function getOrgMemberRole(user_id: string, org_id: string) {
  const { data, error } = await supabase
    .from('org_members')
    .select('role')
    .eq('user_id', user_id)
    .eq('org_id', org_id)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data?.role || null
}

export async function getUserOrganizations(user_id: string) {
  const { data, error } = await supabase
    .from('org_members')
    .select('org_id, role')
    .eq('user_id', user_id)

  if (error) throw error
  return data
}

// Team queries
export async function getTeams(org_id: string) {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('org_id', org_id)

  if (error) throw error
  return data as Team[]
}

export async function getTeam(team_id: string) {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', team_id)
    .single()

  if (error) throw error
  return data as Team
}

// Portfolio queries
export async function getPortfolios(org_id: string) {
  const { data, error } = await supabase
    .from('portfolios')
    .select(`
      *,
      teams(*)
    `)
    .eq('teams.org_id', org_id)

  if (error) throw error
  return data as Portfolio[]
}

export async function getPortfolio(portfolio_id: string) {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', portfolio_id)
    .single()

  if (error) throw error
  return data as Portfolio
}

export async function getTeamPortfolios(team_id: string) {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('team_id', team_id)

  if (error) throw error
  return data as Portfolio[]
}

export async function getUserAccessiblePortfolios(user_id: string, org_id: string) {
  // Get user's role in org
  const role = await getOrgMemberRole(user_id, org_id)

  if (role === 'admin') {
    // Admins see all portfolios
    return getPortfolios(org_id)
  } else if (role === 'team_leader') {
    // Team leaders see portfolios in their teams
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id')
      .eq('leader_id', user_id)
      .eq('org_id', org_id)

    if (teamsError) throw teamsError

    const teamIds = teams.map((t) => t.id)
    const { data: portfolios, error: portfoliosError } = await supabase
      .from('portfolios')
      .select('*')
      .in('team_id', teamIds)

    if (portfoliosError) throw portfoliosError
    return portfolios as Portfolio[]
  } else {
    // Regular users see only portfolios they have access to
    const { data: access, error: accessError } = await supabase
      .from('portfolio_members')
      .select('portfolio_id')
      .eq('user_id', user_id)

    if (accessError) throw accessError

    const portfolioIds = access.map((a) => a.portfolio_id)
    if (portfolioIds.length === 0) return []

    const { data: portfolios, error: portfoliosError } = await supabase
      .from('portfolios')
      .select('*')
      .in('id', portfolioIds)

    if (portfoliosError) throw portfoliosError
    return portfolios as Portfolio[]
  }
}

// Portfolio holdings and allocations
export async function getPortfolioAllocations(portfolio_id: string) {
  const { data, error } = await supabase
    .from('allocations')
    .select('*')
    .eq('portfolio_id', portfolio_id)

  if (error) throw error
  return data
}

export async function getPortfolioHoldings(portfolio_id: string) {
  const { data, error } = await supabase
    .from('holdings')
    .select('*')
    .eq('portfolio_id', portfolio_id)

  if (error) throw error
  return data
}

// Portfolio performance
export async function getPortfolioPerformance(portfolio_id: string, days: number = 30) {
  const { data, error } = await supabase
    .from('portfolio_performance')
    .select('*')
    .eq('portfolio_id', portfolio_id)
    .gte('performance_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('performance_date', { ascending: true })

  if (error) throw error
  return data
}

// Cash flows
export async function getCashFlows(portfolio_id: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('cash_flows')
    .select('*')
    .eq('portfolio_id', portfolio_id)
    .order('flow_date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}
