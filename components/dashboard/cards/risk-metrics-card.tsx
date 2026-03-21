"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

const riskMetrics = [
  {
    label: "Volatility",
    value: "15.0%",
    tooltip: "Annualized standard deviation of returns",
  },
  {
    label: "Beta",
    value: "1.10",
    tooltip: "Sensitivity to market movements relative to VNINDEX",
  },
  {
    label: "Sharpe Ratio",
    value: "1.20",
    tooltip: "Risk-adjusted return (higher is better)",
  },
  {
    label: "Tracking Error",
    value: "4.5%",
    tooltip: "Standard deviation of portfolio returns vs benchmark",
  },
]

export function RiskMetricsCard() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Key Risk Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-2 gap-4">
          {riskMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-help text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{metric.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-lg font-semibold text-foreground">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
