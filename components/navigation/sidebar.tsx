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
    <div className="w-64 border-r border-neutral-200 bg-white min-h-screen flex flex-col">
      {/* Logo/Branding */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FI</span>
          </div>
          <h1 className="font-bold text-neutral-900">FinTech Dashboard</h1>
        </div>
        <p className="text-xs text-neutral-500">Multi-tier Portfolio Management</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Home */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        {/* Teams Section */}
        {canManageTeams && (
          <div>
            <button
              onClick={toggleTeams}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Teams</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedTeams ? '' : '-rotate-90'
                }`}
              />
            </button>

            {/* Team List */}
            {expandedTeams && (
              <div className="ml-2 mt-2 space-y-1 border-l-2 border-neutral-200 pl-3">
                {mockTeams.map(team => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.id}`}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-300" />
                    {team.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        {(canManageTeams || canAccessAdmin) && (
          <div className="my-4 border-t border-neutral-200" />
        )}

        {/* Settings */}
        {canAccessAdmin && (
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">System Settings</span>
          </Link>
        )}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-neutral-200 space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-neutral-900 capitalize">
            {user.role.replace(/_/g, ' ')}
          </p>
          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
