"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Generate mock data for NAV vs Benchmark
function generateChartData(range: string) {
  const dataPoints = {
    "1M": 30,
    "3M": 90,
    "YTD": 78,
    "1Y": 365,
  }[range] || 30

  const data = []
  const basePortfolio = 1200
  const baseBenchmark = 1200
  
  for (let i = 0; i < dataPoints; i += Math.ceil(dataPoints / 30)) {
    const date = new Date()
    date.setDate(date.getDate() - (dataPoints - i))
    
    const portfolioGrowth = 1 + (i / dataPoints) * 0.25 + Math.random() * 0.05
    const benchmarkGrowth = 1 + (i / dataPoints) * 0.18 + Math.random() * 0.04
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      portfolio: Math.round(basePortfolio * portfolioGrowth),
      benchmark: Math.round(baseBenchmark * benchmarkGrowth),
    })
  }
  
  return data
}

export function NAVChart() {
  const [range, setRange] = useState("YTD")
  const { resolvedTheme } = useTheme()
  const data = generateChartData(range)
  
  const isDark = resolvedTheme === "dark"
  const gridColor = isDark ? "#374151" : "#e2e8f0"
  const tickColor = isDark ? "#9ca3af" : "#64748b"
  const tooltipBg = isDark ? "#1f2937" : "#fff"
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0"
  const tooltipLabelColor = isDark ? "#f9fafb" : "#1e293b"
  const portfolioColor = isDark ? "#f9fafb" : "#0f172a"
  const benchmarkColor = isDark ? "#6b7280" : "#94a3b8"

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          NAV vs Benchmark
        </CardTitle>
        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(value) => value && setRange(value)}
          className="gap-0 rounded-md border border-border"
        >
          {["1M", "3M", "YTD", "1Y"].map((period) => (
            <ToggleGroupItem
              key={period}
              value={period}
              className="h-8 rounded-none border-0 px-3 text-xs font-medium text-muted-foreground first:rounded-l-md last:rounded-r-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {period}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: tickColor, fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fill: tickColor, fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}B`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: tooltipLabelColor, fontWeight: 600 }}
                formatter={(value: number) => [`${(value / 1000).toFixed(2)}B VND`, ""]}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                name="Portfolio"
                stroke={portfolioColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: portfolioColor }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                name="VNINDEX"
                stroke={benchmarkColor}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, fill: benchmarkColor }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
