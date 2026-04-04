"use client"

import { Portfolio, formatCurrency, formatPercent } from '@/lib/mock-data'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface PortfolioCardProps {
  portfolio: Portfolio
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const returnColor = portfolio.return >= 0 ? 'text-green-600' : 'text-red-600'

  return (
    <Link href={`/dashboard/${portfolio.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300 cursor-pointer">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-neutral-900 text-lg line-clamp-1">
                {portfolio.name}
              </h3>
              <p className="text-sm text-neutral-500">{portfolio.code}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {portfolio.status === 'active' ? 'Active' : 'Archived'}
            </span>
          </div>
        </div>

        {/* NAV and Return Row */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-neutral-200">
          <div>
            <p className="text-xs text-neutral-500 mb-1">NAV</p>
            <p className="font-semibold text-neutral-900">
              {formatCurrency(portfolio.nav)}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Return</p>
            <p className={`font-semibold ${returnColor}`}>
              {formatPercent(portfolio.return)}
            </p>
          </div>
        </div>

        {/* Allocation Chart and Legend */}
        <div className="flex items-center gap-3">
          {/* Pie Chart */}
          <div className="flex-shrink-0" style={{ width: 80, height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolio.allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
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
          <div className="flex-1">
            <div className="space-y-1.5">
              {portfolio.allocation.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-neutral-600">
                    {item.label}: <span className="font-medium">{item.value}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-neutral-400 mt-4 pt-4 border-t border-neutral-200">
          Last updated: {portfolio.lastUpdated}
        </p>
      </div>
    </Link>
  )
}
