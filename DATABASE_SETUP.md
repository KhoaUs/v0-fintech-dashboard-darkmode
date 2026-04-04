DATABASE SETUP GUIDE
====================

## Overview
This project uses PostgreSQL as the primary database for the multi-tier organization portfolio management system. 

## Database Schema

### Core Tables
1. **organizations** - Organizations/Funds
2. **users** - User accounts
3. **org_members** - User-Organization relationships with roles
4. **teams** - Teams within organizations
5. **portfolios** - Portfolio entities
6. **portfolio_members** - User-Portfolio access relationships

### Portfolio Data Tables
1. **holdings** - Individual holdings in portfolios
2. **allocations** - Asset class allocations
3. **transactions** - Buy/sell and other transactions
4. **portfolio_performance** - Daily/monthly/annual performance metrics
5. **cash_flows** - Deposits, withdrawals, dividends, fees

## Setup Instructions

### Option 1: Using Supabase
1. Create a new Supabase project
2. Go to SQL Editor in Supabase dashboard
3. Execute migrations in order:
   - `scripts/001_create_core_tables.sql`
   - `scripts/002_create_portfolio_data_tables.sql`
   - `scripts/003_setup_row_level_security.sql`
   - `scripts/004_insert_sample_data.sql`

### Option 2: Using Neon (PostgreSQL)
1. Create a new Neon project
2. Connect using SQL client or Neon dashboard SQL Editor
3. Execute the same SQL scripts in order

### Option 3: Local PostgreSQL Development
```bash
# Connect to your local PostgreSQL instance
psql -U your_user -d your_database

# Execute scripts in order
\i scripts/001_create_core_tables.sql
\i scripts/002_create_portfolio_data_tables.sql
\i scripts/003_setup_row_level_security.sql
\i scripts/004_insert_sample_data.sql
```

## Role Hierarchy & Permissions

### Admin
- Full system access
- Can manage all organizations, teams, and portfolios
- Can manage system settings
- Access: All data

### Team Leader
- Manage team portfolios and members
- Cannot access system settings
- Access: Team data only

### Account Owner
- Create and manage portfolios
- Can invite team members
- Cannot access system settings
- Access: Own portfolio + team portfolios

### Customer
- Read-only access to assigned portfolios
- Cannot create portfolios or manage teams
- Access: Assigned portfolios only

## Row-Level Security (RLS)

The database implements RLS policies to enforce role-based access control at the database level:
- Users can only see data they have permission to access
- Policies automatically restrict queries based on user roles
- All sensitive operations go through authenticated functions

## Environment Variables

Set these in your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_postgresql_connection_string
```

## Key Features

### Multi-Tenancy
- Complete data isolation between organizations
- Users can belong to multiple organizations with different roles

### Audit Trail
- All tables have created_at and updated_at timestamps
- Enables tracking of data changes and modifications

### Performance Optimization
- Indexed foreign keys and common queries
- Partitioned tables (optional for large datasets)
- Connection pooling recommended for production

### Security
- Row-Level Security policies
- Password hashing for user accounts
- Prepared statements for all queries
- Input validation on application layer

## Migration Strategy

### Development
1. Modify schema locally or in Supabase
2. Export changes
3. Create new migration file with timestamp

### Production
1. Test migrations in staging environment first
2. Create backup before running
3. Execute migrations during maintenance window
4. Verify data integrity after completion

## Monitoring & Maintenance

### Regular Tasks
- Monitor disk usage and connection limits
- Review slow query logs
- Maintain index efficiency
- Update PostgreSQL when new versions available

### Backups
- Enable automated backups in Supabase/Neon
- Test restore procedures quarterly
- Maintain backup retention policy

## Troubleshooting

### Connection Issues
- Verify DATABASE_URL is correct
- Check firewall rules allow connections
- Ensure connection pooling is configured

### Performance Issues
- Check query execution plans
- Verify indexes are being used
- Monitor table sizes and bloat

### RLS Permission Denied
- Verify user is authenticated
- Check org_members table for user-org relationships
- Review RLS policies in `003_setup_row_level_security.sql`

## Next Steps

1. Set up Supabase or Neon account
2. Run all migration scripts in order
3. Configure environment variables
4. Test database connections
5. Implement database client libraries (next steps in development)
