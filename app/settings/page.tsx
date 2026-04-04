"use client"

import { currentUser } from '@/lib/mock-data'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock, Users, Database, Settings as SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { AdminHeader } from '@/components/admin/admin-header'
import { OrganizationsTab } from '@/components/admin/organizations-tab'
import { UsersTab } from '@/components/admin/users-tab'
import { TeamsTab } from '@/components/admin/teams-tab'

// Mock data for demo
const mockOrganizations = [
  {
    id: 'org-1',
    name: 'Tech Growth Fund',
    description: 'Professional technology investment fund',
    website: 'https://techgrowth.fund',
    member_count: 5,
    portfolio_count: 8,
    created_at: '2024-01-15',
  },
]

const mockUsers = [
  {
    id: 'user-admin',
    email: 'admin@techgrowth.fund',
    name: 'Admin User',
    role: 'admin',
    organization_name: 'Tech Growth Fund',
    created_at: '2024-01-15',
  },
  {
    id: 'user-john',
    email: 'john@techgrowth.fund',
    name: 'John Leader',
    role: 'team_leader',
    organization_name: 'Tech Growth Fund',
    created_at: '2024-01-20',
  },
  {
    id: 'user-alice',
    email: 'alice@techgrowth.fund',
    name: 'Alice Owner',
    role: 'account_owner',
    organization_name: 'Tech Growth Fund',
    created_at: '2024-01-22',
  },
]

const mockTeams = [
  {
    id: 'team-1',
    name: 'Growth Tech Investments',
    organization_name: 'Tech Growth Fund',
    leader_name: 'John Leader',
    member_count: 3,
    portfolio_count: 2,
    created_at: '2024-01-20',
  },
  {
    id: 'team-2',
    name: 'SaaS Portfolio',
    organization_name: 'Tech Growth Fund',
    leader_name: 'John Leader',
    member_count: 2,
    portfolio_count: 2,
    created_at: '2024-01-22',
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organizations')

  // Only admins can access this page
  if (currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Only administrators can access system settings.</p>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1 bg-background min-h-screen">
      <AdminHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
            <TabsTrigger value="organizations" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Organizations</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Teams</span>
            </TabsTrigger>
          </TabsList>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="mt-6">
            <OrganizationsTab organizations={mockOrganizations} />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-6">
            <UsersTab users={mockUsers} />
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="mt-6">
            <TeamsTab teams={mockTeams} />
          </TabsContent>
        </Tabs>

        {/* Info Notice */}
        <div className="mt-12 p-6 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm text-foreground">
            <strong>Database Integration:</strong> This admin console is currently displaying mock data. After connecting to your PostgreSQL database (Supabase/Neon), these tables will display real data. See DATABASE_INTEGRATION.md for setup instructions.
          </p>
        </div>
      </div>
    </main>
  )
}
