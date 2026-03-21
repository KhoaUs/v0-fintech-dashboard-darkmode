"use client"

import { NAVChart } from "../charts/nav-chart"
import { CapitalFlowsChart } from "../charts/capital-flows-chart"
import { TopHoldingsCard } from "../cards/top-holdings-card"
import { RiskMetricsCard } from "../cards/risk-metrics-card"

export function OverviewTab() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Charts */}
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
        <NAVChart />
        <CapitalFlowsChart />
      </div>
      {/* Right Column - Holdings & Metrics */}
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
        <TopHoldingsCard />
        <RiskMetricsCard />
      </div>
    </div>
  )
}
