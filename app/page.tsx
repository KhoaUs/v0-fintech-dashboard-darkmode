"use client"

import { HomeHeader } from '@/components/home/home-header'
import { OrgSummaryStrip } from '@/components/home/org-summary-strip'
import { PortfolioGrid } from '@/components/home/portfolio-grid'
import {
  currentUser,
  mockOrganization,
  getAccessiblePortfolios,
} from '@/lib/mock-data'

export default function HomePage() {
  const accessiblePortfolios = getAccessiblePortfolios(currentUser)

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader user={currentUser} organization={mockOrganization} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Section 1: Organization KPIs */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Organization Overview
            </h2>
          </div>
          <OrgSummaryStrip organization={mockOrganization} />
        </div>

        {/* Section 2: Portfolio Grid */}
        <div>
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Your Portfolios
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {accessiblePortfolios.length} portfolio
              {accessiblePortfolios.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <PortfolioGrid portfolios={accessiblePortfolios} />
        </div>
      </main>
    </div>
  )
}
