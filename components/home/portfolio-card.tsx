"use client"

import { Portfolio, formatCurrency, formatPercent } from '@/lib/mock-data'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface PortfolioCardProps {
  portfolio: Portfolio
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const isPositive = portfolio.return >= 0

  return (
    <Link href={`/dashboard/${portfolio.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary cursor-pointer">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            portfolio.status === 'active' 
              ? 'bg-accent/10 text-accent' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {portfolio.status === 'active' ? 'Active' : 'Archived'}
          </span>
        </div>

        {/* Header */}
        <div className="mb-5">
          <h3 className="font-semibold text-foreground text-lg line-clamp-1 mb-1">
            {portfolio.name}
          </h3>
          <p className="text-sm text-muted-foreground">{portfolio.code}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Net Asset Value</p>
            <p className="font-semibold text-foreground text-base">
              {formatCurrency(portfolio.nav)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Total Return</p>
            <div className="flex items-center gap-1">
              <p className={`font-semibold text-base ${isPositive ? 'text-chart-1' : 'text-destructive'}`}>
                {formatPercent(portfolio.return)}
              </p>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-chart-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>
          </div>
        </div>

        {/* Allocation Section */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Asset Allocation
          </p>
          <div className="flex items-center gap-4">
            {/* Mini Donut Chart */}
            <div className="flex-shrink-0" style={{ width: 90, height: 90 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolio.allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {portfolio.allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-1.5">
              {portfolio.allocation.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground mt-5 pt-5 border-t border-border">
          Updated {portfolio.lastUpdated}
        </p>
      </div>
    </Link>
  )
}
