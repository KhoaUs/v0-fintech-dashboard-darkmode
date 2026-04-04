DATABASE INTEGRATION GUIDE
==========================

## Overview
This guide explains how to integrate the application with a PostgreSQL database (Supabase or Neon) and replace mock data with real database queries.

## Current State
- Application is currently using mock data from `lib/mock-data.ts`
- Database schema scripts are ready in `scripts/` folder
- Database client utilities are available in `lib/db.ts`

## Setup Steps

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Copy connection details (URL and Anon Key)

### Step 2: Execute Database Migrations
1. Open Supabase SQL Editor
2. Execute scripts in this order:
   ```
   scripts/001_create_core_tables.sql
   scripts/002_create_portfolio_data_tables.sql
   scripts/003_setup_row_level_security.sql
   scripts/004_insert_sample_data.sql
   ```

### Step 3: Configure Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (for server-side operations)
```

### Step 4: Install Supabase Client
```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### Step 5: Update Component Data Fetching
Replace mock data imports with database queries.

Example - Home page:
```typescript
// Before (mock data)
import { currentUser, currentOrganization, getAccessiblePortfolios } from '@/lib/mock-data'

// After (database queries)
import { getUser, getOrganization, getUserAccessiblePortfolios } from '@/lib/db'
import { auth } from '@/lib/auth'

export default async function HomePage() {
  const session = await auth()
  const user = await getUser(session.user.id)
  const organization = await getOrganization(user.org_id)
  const portfolios = await getUserAccessiblePortfolios(session.user.id, user.org_id)
  // ... use real data
}
```

## Available Database Functions

### Organizations
- `getOrganization(org_id)` - Get organization details
- `getUserOrganizations(user_id)` - Get all organizations for user

### Teams
- `getTeams(org_id)` - Get all teams in organization
- `getTeam(team_id)` - Get specific team

### Portfolios
- `getPortfolios(org_id)` - Get all portfolios in org
- `getPortfolio(portfolio_id)` - Get specific portfolio
- `getTeamPortfolios(team_id)` - Get portfolios in team
- `getUserAccessiblePortfolios(user_id, org_id)` - Get portfolios user can access

### Portfolio Data
- `getPortfolioAllocations(portfolio_id)` - Get asset allocations
- `getPortfolioHoldings(portfolio_id)` - Get holdings
- `getPortfolioPerformance(portfolio_id, days)` - Get performance data
- `getCashFlows(portfolio_id, limit)` - Get cash flows

## Migration Strategy

### Phase 1: Server Components (RSC)
Update page components to fetch data server-side:
```typescript
export default async function Page() {
  const data = await getPortfolio(id)
  return <PortfolioView data={data} />
}
```

### Phase 2: API Routes
Create API routes for client-side fetching:
```typescript
// app/api/portfolios/[id]/route.ts
export async function GET(req, { params }) {
  const portfolio = await getPortfolio(params.id)
  return Response.json(portfolio)
}
```

### Phase 3: Client-side SWR
Use SWR for efficient data fetching and caching:
```typescript
'use client'
import useSWR from 'swr'

export function PortfolioList() {
  const { data, isLoading } = useSWR('/api/portfolios', fetcher)
  return <>{/* ... */}</>
}
```

## Error Handling

Always wrap database calls in try-catch:
```typescript
try {
  const data = await getPortfolio(id)
} catch (error) {
  console.error('Failed to fetch portfolio:', error)
  // Handle error appropriately
}
```

## Performance Optimization

### Indexes
Database schema includes indexes on:
- Foreign keys (user_id, org_id, portfolio_id)
- Frequently queried fields (email, status)
- Date fields (created_at, transaction_date)

### Pagination
For large datasets, implement pagination:
```typescript
const { data, error, count } = await supabase
  .from('portfolios')
  .select('*', { count: 'exact' })
  .eq('team_id', team_id)
  .range(0, 19) // First 20 items
```

### Real-time Subscriptions (Optional)
Use Supabase real-time for live updates:
```typescript
supabase
  .from('portfolios')
  .on('*', payload => {
    console.log('Portfolio updated:', payload)
  })
  .subscribe()
```

## Testing with Mock Data

During development, you can continue using mock data while database is configured:
1. Keep `lib/mock-data.ts` as-is
2. Gradually migrate components
3. Use database queries for new components
4. Complete migration when all components updated

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not set"
- Check `.env.local` has correct variable names
- Restart dev server after adding env vars
- Ensure variables start with `NEXT_PUBLIC_` for client-side access

### RLS Policy Errors
- Verify user is authenticated
- Check org_members table for user-org relationships
- Review RLS policies in `003_setup_row_level_security.sql`

### Connection Timeout
- Check database is running
- Verify connection string is correct
- Check network connectivity
- Review Supabase/Neon connection limits

## Next Steps
1. Set up Supabase account and project
2. Run migration scripts
3. Add environment variables
4. Start migrating components to use real data
5. Test all functionality with production database
6. Deploy to production

## Additional Resources
- Supabase Docs: https://supabase.com/docs
- Supabase JavaScript Client: https://supabase.com/docs/reference/javascript/introduction
- PostgreSQL Documentation: https://www.postgresql.org/docs/
