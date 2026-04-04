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
    <div className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Section - Org Name and User */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {organization.name}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              {organization.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900">{user.name}</p>
              <p className="text-xs text-neutral-500 capitalize">
                {user.role.replace(/_/g, ' ')}
              </p>
            </div>
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {canCreatePortfolio && (
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4" />
              New Portfolio
            </Button>
          )}
          {canManageTeam && (
            <Button
              variant="outline"
              className="gap-2 border-neutral-300 text-neutral-900 hover:bg-neutral-50"
            >
              <Users className="w-4 h-4" />
              Manage Team
            </Button>
          )}
          {canAccessSettings && (
            <Button
              variant="outline"
              className="gap-2 border-neutral-300 text-neutral-900 hover:bg-neutral-50"
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
