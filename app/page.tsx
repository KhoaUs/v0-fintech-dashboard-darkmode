"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPIStrip } from "@/components/dashboard/kpi-strip"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export default function DashboardPage() {
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
