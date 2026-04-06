"use client"

import { User, mockTeams } from '@/lib/mock-data'
import Link from 'next/link'
import { Home, Users, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  user: User
}

export function Sidebar({ user }: SidebarProps) {
  const [expandedTeams, setExpandedTeams] = useState<boolean>(true)

  const toggleTeams = () => {
    setExpandedTeams(!expandedTeams)
  }

  const canManageTeams = ['account_owner', 'team_leader', 'admin'].includes(
    user.role
  )
  const canAccessAdmin = user.role === 'admin'

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      {/* Logo/Branding */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">TI</span>
          </div>
          <h1 className="font-bold text-sidebar-foreground">Tech Fund</h1>
        </div>
        <p className="text-xs text-sidebar-foreground/60">Portfolio Management</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Home */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors font-medium text-sm"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* Teams Section */}
        {canManageTeams && (
          <div>
            <button
              onClick={toggleTeams}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors font-medium text-sm"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Teams</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedTeams ? '' : '-rotate-90'
                }`}
              />
            </button>

            {/* Team List */}
            {expandedTeams && (
              <div className="ml-2 mt-2 space-y-1 border-l-2 border-sidebar-border pl-3">
                {mockTeams.map(team => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/80 hover:text-sidebar-primary hover:bg-sidebar-primary/10 rounded transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-sidebar-foreground/30" />
                    {team.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        {(canManageTeams || canAccessAdmin) && (
          <div className="my-4 border-t border-sidebar-border/50" />
        )}

        {/* Settings */}
        {canAccessAdmin && (
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors font-medium text-sm"
          >
            <Settings className="w-5 h-5" />
            <span>System Settings</span>
          </Link>
        )}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-sidebar-foreground capitalize">
            {user.role.replace(/_/g, ' ')}
          </p>
          <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors font-medium">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
