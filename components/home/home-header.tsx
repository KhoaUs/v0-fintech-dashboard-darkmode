"use client"

import { User, Organization } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Plus, Settings, Users } from 'lucide-react'

interface HomeHeaderProps {
  user: User
  organization: Organization
}

export function HomeHeader({ user, organization }: HomeHeaderProps) {
  const canCreatePortfolio = ['account_owner', 'team_leader', 'admin'].includes(
    user.role
  )
  const canManageTeam = ['team_leader', 'admin'].includes(user.role)
  const canAccessSettings = user.role === 'admin'

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Section - Org Name and User */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {organization.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {organization.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role.replace(/_/g, ' ')}
              </p>
            </div>
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-border"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          {canCreatePortfolio && (
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <Plus className="w-4 h-4" />
              New Portfolio
            </Button>
          )}
          {canManageTeam && (
            <Button
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-muted"
            >
              <Users className="w-4 h-4" />
              Manage Team
            </Button>
          )}
          {canAccessSettings && (
            <Button
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-muted"
            >
              <Settings className="w-4 h-4" />
              System Settings
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
