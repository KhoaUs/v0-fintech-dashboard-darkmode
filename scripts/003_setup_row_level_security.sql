-- Migration: 003_setup_row_level_security.sql
-- Description: Enable RLS policies for data access control

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_flows ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY users_select_own_profile ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY users_update_own_profile ON users
  FOR UPDATE USING (auth.uid() = id);

-- Organization members can see organizations they belong to
CREATE POLICY org_members_select ON org_members
  FOR SELECT USING (user_id = auth.uid());

-- Admins can manage organization members
CREATE POLICY org_members_manage ON org_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM org_members om
      WHERE om.user_id = auth.uid()
      AND om.org_id = org_members.org_id
      AND om.role = 'admin'
    )
  );

-- Users can see teams in their organizations
CREATE POLICY teams_select ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.user_id = auth.uid()
      AND org_members.org_id = teams.org_id
    )
  );

-- Team leaders can manage teams
CREATE POLICY teams_manage ON teams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.user_id = auth.uid()
      AND org_members.org_id = teams.org_id
      AND org_members.role IN ('team_leader', 'admin')
    )
  );

-- Users can see portfolios they have access to
CREATE POLICY portfolios_select ON portfolios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolio_members
      WHERE portfolio_members.user_id = auth.uid()
      AND portfolio_members.portfolio_id = portfolios.id
    )
    OR EXISTS (
      SELECT 1 FROM teams
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE teams.id = portfolios.team_id
      AND org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
    )
  );

-- Portfolio members can view portfolio data
CREATE POLICY portfolio_members_select ON portfolio_members
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM portfolios
      JOIN teams ON teams.id = portfolios.team_id
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
      AND portfolios.id = portfolio_members.portfolio_id
    )
  );

-- Holdings visible to portfolio members
CREATE POLICY holdings_select ON holdings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolio_members
      WHERE portfolio_members.user_id = auth.uid()
      AND portfolio_members.portfolio_id = holdings.portfolio_id
    )
    OR EXISTS (
      SELECT 1 FROM portfolios
      JOIN teams ON teams.id = portfolios.team_id
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
      AND portfolios.id = holdings.portfolio_id
    )
  );

-- Similarly for allocations, transactions, performance, and cash flows
CREATE POLICY allocations_select ON allocations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolio_members
      WHERE portfolio_members.user_id = auth.uid()
      AND portfolio_members.portfolio_id = allocations.portfolio_id
    )
    OR EXISTS (
      SELECT 1 FROM portfolios
      JOIN teams ON teams.id = portfolios.team_id
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
      AND portfolios.id = allocations.portfolio_id
    )
  );

CREATE POLICY transactions_select ON transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolio_members
      WHERE portfolio_members.user_id = auth.uid()
      AND portfolio_members.portfolio_id = transactions.portfolio_id
    )
    OR EXISTS (
      SELECT 1 FROM portfolios
      JOIN teams ON teams.id = portfolios.team_id
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
      AND portfolios.id = transactions.portfolio_id
    )
  );

CREATE POLICY portfolio_performance_select ON portfolio_performance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolio_members
      WHERE portfolio_members.user_id = auth.uid()
      AND portfolio_members.portfolio_id = portfolio_performance.portfolio_id
    )
    OR EXISTS (
      SELECT 1 FROM portfolios
      JOIN teams ON teams.id = portfolios.team_id
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
      AND portfolios.id = portfolio_performance.portfolio_id
    )
  );

CREATE POLICY cash_flows_select ON cash_flows
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolio_members
      WHERE portfolio_members.user_id = auth.uid()
      AND portfolio_members.portfolio_id = cash_flows.portfolio_id
    )
    OR EXISTS (
      SELECT 1 FROM portfolios
      JOIN teams ON teams.id = portfolios.team_id
      JOIN org_members ON org_members.org_id = teams.org_id
      WHERE org_members.user_id = auth.uid()
      AND org_members.role IN ('team_leader', 'admin')
      AND portfolios.id = cash_flows.portfolio_id
    )
  );
