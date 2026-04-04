"use client"

import { Organization, formatCurrency, formatPercent } from '@/lib/mock-data'
import { Users, TrendingUp, PieChart, Briefcase } from 'lucide-react'

interface OrgSummaryStripProps {
  organization: Organization
}

export function OrgSummaryStrip({ organization }: OrgSummaryStripProps) {
  const kpis = [
    {
      label: 'Total AUM',
      value: formatCurrency(organization.totalAUM),
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Total Return',
      value: formatPercent(organization.totalReturn),
      icon: TrendingUp,
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Portfolios',
      value: organization.portfolioCount.toString(),
      icon: PieChart,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      label: 'Team Members',
      value: organization.teamMemberCount.toString(),
      icon: Users,
      color: 'bg-orange-100 text-orange-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon
        return (
          <div
            key={idx}
            className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-600 mb-1">
                  {kpi.label}
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {kpi.value}
                </p>
              </div>
              <div className={`rounded-lg p-2.5 ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
