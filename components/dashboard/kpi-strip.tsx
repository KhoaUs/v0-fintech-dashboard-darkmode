"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface KPICardProps {
  label: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  tooltip: string
}

function KPICard({ label, value, change, changeType = "neutral", tooltip }: KPICardProps) {
  const changeColor = {
    positive: "text-emerald-500 dark:text-emerald-400",
    negative: "text-rose-500 dark:text-rose-400",
    neutral: "text-muted-foreground",
  }[changeType]

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-foreground">{value}</span>
          {change && <span className={`text-sm font-medium ${changeColor}`}>{change}</span>}
        </div>
      </CardContent>
    </Card>
  )
}

export function KPIStrip() {
  const kpis = [
    {
      label: "NAV",
      value: "1.5B",
      change: "VND",
      changeType: "neutral" as const,
      tooltip: "Net Asset Value - Total value of the portfolio",
    },
    {
      label: "Total Return",
      value: "+25.4%",
      changeType: "positive" as const,
      tooltip: "Total return since inception including dividends",
    },
    {
      label: "TWR",
      value: "+18.2%",
      changeType: "positive" as const,
      tooltip: "Time-Weighted Return - Performance excluding cash flow effects",
    },
    {
      label: "Alpha",
      value: "+2.1%",
      changeType: "positive" as const,
      tooltip: "Excess return compared to benchmark",
    },
    {
      label: "Max Drawdown",
      value: "-12.5%",
      changeType: "negative" as const,
      tooltip: "Maximum peak-to-trough decline during period",
    },
    {
      label: "Cash Ratio",
      value: "5.2%",
      changeType: "neutral" as const,
      tooltip: "Percentage of portfolio held in cash",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.label} {...kpi} />
      ))}
    </div>
  )
}
