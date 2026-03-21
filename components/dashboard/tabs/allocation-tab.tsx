"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const sectorAllocation = [
  { name: "Technology", current: 28.5, target: 25.0, value: 427500000000 },
  { name: "Financials", current: 22.3, target: 20.0, value: 334500000000 },
  { name: "Consumer", current: 15.8, target: 18.0, value: 237000000000 },
  { name: "Energy", current: 12.4, target: 12.0, value: 186000000000 },
  { name: "Materials", current: 8.2, target: 10.0, value: 123000000000 },
  { name: "Real Estate", current: 7.5, target: 8.0, value: 112500000000 },
  { name: "Healthcare", current: 5.3, target: 7.0, value: 79500000000 },
]

const assetClassAllocation = [
  { name: "Equities", current: 85.2, target: 85.0, color: "#0f172a" },
  { name: "Fixed Income", current: 8.5, target: 10.0, color: "#3b82f6" },
  { name: "Cash", current: 5.2, target: 4.0, color: "#10b981" },
  { name: "Alternatives", current: 1.1, target: 1.0, color: "#8b5cf6" },
]

const geographicAllocation = [
  { name: "Vietnam", current: 78.5, target: 75.0 },
  { name: "Regional ASEAN", current: 12.3, target: 15.0 },
  { name: "Global", current: 9.2, target: 10.0 },
]

const marketCapAllocation = [
  { name: "Large Cap (>50T VND)", current: 55.2, target: 50.0 },
  { name: "Mid Cap (10-50T VND)", current: 32.5, target: 35.0 },
  { name: "Small Cap (<10T VND)", current: 12.3, target: 15.0 },
]

const COLORS = ["#0f172a", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e", "#6366f1"]

const sectorPieData = sectorAllocation.map((item, index) => ({
  name: item.name,
  value: item.current,
  color: COLORS[index % COLORS.length],
}))

function formatCurrency(value: number) {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(1)}T`
  }
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`
  }
  return value.toLocaleString()
}

export function AllocationTab() {
  const [view, setView] = useState<"current" | "target" | "drift">("current")
  const { resolvedTheme } = useTheme()
  
  const isDark = resolvedTheme === "dark"
  const gridColor = isDark ? "#374151" : "#e2e8f0"
  const tickColor = isDark ? "#9ca3af" : "#64748b"
  const tooltipBg = isDark ? "#1f2937" : "white"
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0"
  const primaryBarColor = isDark ? "#f9fafb" : "#0f172a"
  const secondaryBarColor = isDark ? "#4b5563" : "#cbd5e1"

  return (
    <div className="flex flex-col gap-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Portfolio Allocation</h2>
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {(["current", "target", "drift"] as const).map((v) => (
            <Button
              key={v}
              variant={view === v ? "default" : "ghost"}
              size="sm"
              className={`h-8 px-3 text-sm capitalize ${view === v ? "" : "text-muted-foreground"}`}
              onClick={() => setView(v)}
            >
              {v}
            </Button>
          ))}
        </div>
      </div>

      {/* Top Row - Sector Allocation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sector Pie Chart */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Sector Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sector Table */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Sector Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-medium text-muted-foreground">Sector</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Current</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Target</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Drift</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectorAllocation.map((row, index) => {
                  const drift = row.current - row.target
                  return (
                    <TableRow key={row.name} className="border-border hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium text-foreground">{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        {row.current.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {row.target.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${drift > 0 ? "text-emerald-600 dark:text-emerald-400" : drift < 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                          {drift > 0 ? "+" : ""}{drift.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(row.value)} VND
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row - Asset Class & Geographic */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Asset Class Allocation */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-foreground">Asset Class Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {assetClassAllocation.map((item) => {
                const drift = item.current - item.target
                return (
                  <div key={item.name} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground">{item.current.toFixed(1)}%</span>
                        <span className={`text-xs ${drift > 0 ? "text-emerald-600 dark:text-emerald-400" : drift < 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                          ({drift > 0 ? "+" : ""}{drift.toFixed(1)}% vs target)
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all"
                        style={{ width: `${item.current}%`, backgroundColor: item.color }}
                      />
                      <div
                        className="absolute top-0 h-full w-0.5 bg-muted-foreground"
                        style={{ left: `${item.target}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Allocation */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-foreground">Geographic Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={geographicAllocation}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tickColor }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} width={75} />
                  <RechartsTooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="current" name="Current" fill={primaryBarColor} radius={[0, 4, 4, 0]} barSize={20} />
                  <Bar dataKey="target" name="Target" fill={secondaryBarColor} radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Market Cap */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Market Capitalization Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {marketCapAllocation.map((item, index) => {
              const drift = item.current - item.target
              const colors = ["#0f172a", "#3b82f6", "#10b981"]
              return (
                <div key={item.name} className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="h-24 w-24 -rotate-90 transform">
                      <circle cx="48" cy="48" r="40" stroke={gridColor} strokeWidth="8" fill="none" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={colors[index]}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${item.current * 2.51} 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-lg font-bold text-foreground">{item.current.toFixed(0)}%</span>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Target: {item.target}%</p>
                    <p className={`text-sm font-medium ${drift > 0 ? "text-emerald-600 dark:text-emerald-400" : drift < 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                      Drift: {drift > 0 ? "+" : ""}{drift.toFixed(1)}%
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
