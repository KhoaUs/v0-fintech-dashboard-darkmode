-- Migration: 004_insert_sample_data.sql
-- Description: Insert sample data for testing and development

-- Insert sample organization
INSERT INTO organizations (name, description, website) VALUES
  ('Tech Growth Fund', 'Professional technology investment fund', 'https://techgrowth.fund');

-- Insert sample users
INSERT INTO users (email, name, password_hash, avatar_url) VALUES
  ('admin@techgrowth.fund', 'Admin User', '$2b$10$admin_hash_placeholder', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'),
  ('john@techgrowth.fund', 'John Leader', '$2b$10$john_hash_placeholder', 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'),
  ('alice@techgrowth.fund', 'Alice Owner', '$2b$10$alice_hash_placeholder', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'),
  ('bob@techgrowth.fund', 'Bob Customer', '$2b$10$bob_hash_placeholder', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'),
  ('carol@techgrowth.fund', 'Carol Team Member', '$2b$10$carol_hash_placeholder', 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol');

-- Get IDs for use in subsequent inserts (Note: In production, use actual UUID values)
-- For this sample, we'll use placeholder approach

-- Insert organization members
INSERT INTO org_members (user_id, org_id, role) 
SELECT u.id, o.id, role_value FROM (
  VALUES 
    ('admin@techgrowth.fund', 'admin'),
    ('john@techgrowth.fund', 'team_leader'),
    ('alice@techgrowth.fund', 'account_owner'),
    ('bob@techgrowth.fund', 'customer'),
    ('carol@techgrowth.fund', 'customer')
) AS roles(email, role_value)
JOIN users u ON u.email = roles.email
JOIN organizations o ON o.name = 'Tech Growth Fund';

-- Insert sample teams
INSERT INTO teams (org_id, name, description, leader_id)
SELECT o.id, team_name, team_desc, u.id FROM (
  VALUES
    ('Tech Growth Fund', 'Growth Tech Investments', 'Focused on technology startups'),
    ('Tech Growth Fund', 'SaaS Portfolio', 'Software-as-a-Service investments'),
    ('Tech Growth Fund', 'Analytics Team', 'Data analysis and reporting'),
    ('Tech Growth Fund', 'Blockchain Fund', 'Cryptocurrency and blockchain investments')
) AS teams(org_name, team_name, team_desc)
JOIN organizations o ON o.name = org_name
JOIN users u ON u.email = 'john@techgrowth.fund';

-- Insert sample portfolios
INSERT INTO portfolios (team_id, name, code, benchmark, nav, status)
SELECT t.id, port_name, port_code, benchmark_val, 5000000, 'active'
FROM (
  VALUES
    ('Growth Tech Investments', 'Tech Leaders Fund', 'TLF', 'NASDAQ-100'),
    ('Growth Tech Investments', 'Emerging Tech Fund', 'ETF', 'Russell 2000'),
    ('SaaS Portfolio', 'SaaS Growth Fund', 'SGF', 'SaaS Index'),
    ('SaaS Portfolio', 'Enterprise SaaS Fund', 'ESF', 'Cloud Computing Index'),
    ('Blockchain Fund', 'DeFi Fund', 'DEF', 'Crypto Index'),
    ('Blockchain Fund', 'Web3 Fund', 'W3F', 'Layer-1 Index'),
    ('Analytics Team', 'Mixed Portfolio', 'MIX', 'S&P 500'),
    ('Analytics Team', 'Value Fund', 'VAL', 'Value Index')
) AS portfolios(team_name, port_name, port_code, benchmark_val)
JOIN teams t ON t.name = team_name;

-- Insert sample allocations for first portfolio
INSERT INTO allocations (portfolio_id, asset_class, percentage, color_code)
SELECT p.id, asset_class, pct, color FROM (
  SELECT 'Tech Leaders Fund' as port_name, 'Equities' as asset_class, 60 as pct, '#3b82f6' as color
  UNION ALL SELECT 'Tech Leaders Fund', 'Bonds', 25, '#10b981'
  UNION ALL SELECT 'Tech Leaders Fund', 'Cash', 10, '#f59e0b'
  UNION ALL SELECT 'Tech Leaders Fund', 'Alternatives', 5, '#8b5cf6'
) AS alloc_data
JOIN portfolios p ON p.code = alloc_data.port_name || ' Code';

-- Note: For complete sample data, additional insert statements would follow
-- This provides a template for the data structure

-- Enable auto-increment for better data management
-- Commit all changes
COMMIT;
