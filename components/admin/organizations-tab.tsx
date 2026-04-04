"use client"

import { Button } from '@/components/ui/button'
import { Edit, Trash2, Users } from 'lucide-react'

interface Organization {
  id: string
  name: string
  description: string | null
  website: string | null
  member_count: number
  portfolio_count: number
  created_at: string
}

interface OrganizationsTabProps {
  organizations: Organization[]
}

export function OrganizationsTab({ organizations }: OrganizationsTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Description
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
              {organizations.map((org) => (
                <tr key={org.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{org.name}</p>
                      <p className="text-xs text-muted-foreground">{org.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {org.description || '—'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Users className="w-4 h-4" />
                      {org.member_count}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground font-medium">
                      {org.portfolio_count}
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
