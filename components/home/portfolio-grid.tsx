"use client"

import { Portfolio } from '@/lib/mock-data'
import { PortfolioCard } from './portfolio-card'

interface PortfolioGridProps {
  portfolios: Portfolio[]
}

export function PortfolioGrid({ portfolios }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {portfolios.map(portfolio => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  )
}
