"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPIStrip } from "@/components/dashboard/kpi-strip"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { mockPortfolios } from "@/lib/mock-data"
import { use } from "react"

export default function PortfolioDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the Promise using React.use() in client components
  const { id } = use(params)
  
  // In a real app, this would fetch the portfolio by ID from the database
  const portfolio = mockPortfolios.find(p => p.id === id)

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Portfolio Not Found</h1>
          <p className="text-neutral-600">The portfolio you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <KPIStrip />
        <div className="mt-6">
          <DashboardTabs />
        </div>
      </main>
    </div>
  )
}

