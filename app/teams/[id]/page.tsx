"use client"

import { mockTeams, mockPortfolios, currentUser } from '@/lib/mock-data'
import { PortfolioGrid } from '@/components/home/portfolio-grid'
import { Button } from '@/components/ui/button'
import { Users, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

export default function TeamsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const team = mockTeams.find(t => t.id === id)
  const teamPortfolios = mockPortfolios.filter(p => p.teamId === id)

  if (!team) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Team Not Found</h1>
          <Link href="/">
            <Button className="mt-4">Go Back Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const canManageTeam = ['team_leader', 'admin'].includes(currentUser.role)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-700" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900">{team.name}</h1>
              </div>
              <p className="text-sm text-neutral-500 ml-13">
                {team.memberCount} team members
              </p>
            </div>

            {canManageTeam && (
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Team Portfolios
          </h2>
          <p className="text-sm text-neutral-500">
            {teamPortfolios.length} portfolio
            {teamPortfolios.length !== 1 ? 's' : ''} managed by {team.name}
          </p>
        </div>
        <PortfolioGrid portfolios={teamPortfolios} />
      </main>
    </div>
  )
}


  if (!team) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Team Not Found</h1>
          <Link href="/">
            <Button className="mt-4">Go Back Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const canManageTeam = ['team_leader', 'admin'].includes(currentUser.role)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-700" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900">{team.name}</h1>
              </div>
              <p className="text-sm text-neutral-500 ml-13">
                {team.memberCount} team members
              </p>
            </div>

            {canManageTeam && (
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Team Portfolios
          </h2>
          <p className="text-sm text-neutral-500">
            {teamPortfolios.length} portfolio
            {teamPortfolios.length !== 1 ? 's' : ''} managed by {team.name}
          </p>
        </div>
        <PortfolioGrid portfolios={teamPortfolios} />
      </main>
    </div>
  )
}
