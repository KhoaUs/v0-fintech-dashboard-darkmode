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
      colorBg: 'bg-accent/5',
      colorIcon: 'bg-accent/10 text-accent',
    },
    {
      label: 'Total Return',
      value: formatPercent(organization.totalReturn),
      icon: TrendingUp,
      colorBg: 'bg-chart-1/5',
      colorIcon: 'bg-chart-1/10 text-chart-1',
    },
    {
      label: 'Portfolios',
      value: organization.portfolioCount.toString(),
      icon: PieChart,
      colorBg: 'bg-chart-2/5',
      colorIcon: 'bg-chart-2/10 text-chart-2',
    },
    {
      label: 'Team Members',
      value: organization.teamMemberCount.toString(),
      icon: Users,
      colorBg: 'bg-chart-3/5',
      colorIcon: 'bg-chart-3/10 text-chart-3',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon
        return (
          <div
            key={idx}
            className={`rounded-lg border border-border ${kpi.colorBg} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {kpi.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {kpi.value}
                </p>
              </div>
              <div className={`rounded-lg p-3 flex-shrink-0 ${kpi.colorIcon}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
