"use client"

import { Button } from '@/components/ui/button'
import { Edit, Trash2, Users } from 'lucide-react'

interface Team {
  id: string
  name: string
  organization_name: string
  leader_name: string
  member_count: number
  portfolio_count: number
  created_at: string
}

interface TeamsTabProps {
  teams: Team[]
}

export function TeamsTab({ teams }: TeamsTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Leader
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Portfolios
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{team.name}</p>
                      <p className="text-xs text-muted-foreground">{team.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">
                      {team.organization_name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">
                      {team.leader_name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Users className="w-4 h-4" />
                      {team.member_count}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground font-medium">
                      {team.portfolio_count}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-foreground hover:bg-muted"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
