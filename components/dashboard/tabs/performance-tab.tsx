"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts"

const performanceData = [
  { date: "Jan 23", portfolio: 100, benchmark: 100 },
  { date: "Feb 23", portfolio: 102.5, benchmark: 101.2 },
  { date: "Mar 23", portfolio: 98.3, benchmark: 99.8 },
  { date: "Apr 23", portfolio: 105.2, benchmark: 103.5 },
  { date: "May 23", portfolio: 108.7, benchmark: 105.1 },
  { date: "Jun 23", portfolio: 112.4, benchmark: 107.8 },
  { date: "Jul 23", portfolio: 115.8, benchmark: 109.2 },
  { date: "Aug 23", portfolio: 110.2, benchmark: 106.5 },
  { date: "Sep 23", portfolio: 114.6, benchmark: 108.9 },
  { date: "Oct 23", portfolio: 118.3, benchmark: 111.2 },
  { date: "Nov 23", portfolio: 121.7, benchmark: 113.8 },
  { date: "Dec 23", portfolio: 125.4, benchmark: 116.5 },
]

const drawdownData = [
  { date: "Jan 23", drawdown: 0 },
  { date: "Feb 23", drawdown: 0 },
  { date: "Mar 23", drawdown: -6.7 },
  { date: "Apr 23", drawdown: 0 },
  { date: "May 23", drawdown: 0 },
  { date: "Jun 23", drawdown: 0 },
  { date: "Jul 23", drawdown: 0 },
  { date: "Aug 23", drawdown: -4.8 },
  { date: "Sep 23", drawdown: -1.0 },
  { date: "Oct 23", drawdown: 0 },
  { date: "Nov 23", drawdown: 0 },
  { date: "Dec 23", drawdown: 0 },
]

const monthlyReturns = [
  { month: "Jan 24", portfolio: 2.8, benchmark: 1.9 },
  { month: "Feb 24", portfolio: 1.5, benchmark: 2.1 },
  { month: "Mar 24", portfolio: 3.2, benchmark: 2.4 },
  { month: "Apr 24", portfolio: -1.2, benchmark: -0.8 },
  { month: "May 24", portfolio: 2.1, benchmark: 1.5 },
  { month: "Jun 24", portfolio: 1.8, benchmark: 1.2 },
]

const periodReturns = [
  { period: "MTD", portfolio: 1.8, benchmark: 1.2, excess: 0.6 },
  { period: "QTD", portfolio: 5.2, benchmark: 3.8, excess: 1.4 },
  { period: "YTD", portfolio: 10.5, benchmark: 8.3, excess: 2.2 },
  { period: "1 Year", portfolio: 25.4, benchmark: 16.5, excess: 8.9 },
  { period: "3 Year (Ann.)", portfolio: 18.2, benchmark: 12.4, excess: 5.8 },
  { period: "5 Year (Ann.)", portfolio: 15.8, benchmark: 10.2, excess: 5.6 },
  { period: "Since Inception", portfolio: 142.5, benchmark: 98.3, excess: 44.2 },
]

const riskMetrics = [
  { metric: "Annualized Volatility", value: "18.5%", benchmark: "22.3%", description: "Standard deviation of returns" },
  { metric: "Sharpe Ratio", value: "1.42", benchmark: "0.89", description: "Risk-adjusted return measure" },
  { metric: "Sortino Ratio", value: "1.85", benchmark: "1.12", description: "Downside risk-adjusted return" },
  { metric: "Information Ratio", value: "0.95", benchmark: "-", description: "Excess return per unit of tracking error" },
  { metric: "Beta", value: "0.85", benchmark: "1.00", description: "Systematic risk relative to benchmark" },
  { metric: "Alpha (Ann.)", value: "+2.1%", benchmark: "-", description: "Excess return above expected" },
  { metric: "Max Drawdown", value: "-12.5%", benchmark: "-18.2%", description: "Largest peak-to-trough decline" },
  { metric: "Tracking Error", value: "4.2%", benchmark: "-", description: "Deviation from benchmark returns" },
]

export function PerformanceTab() {
  const [chartPeriod, setChartPeriod] = useState("1y")
  const { resolvedTheme } = useTheme()
  
  const isDark = resolvedTheme === "dark"
  const gridColor = isDark ? "#374151" : "#e2e8f0"
  const tickColor = isDark ? "#9ca3af" : "#64748b"
  const tooltipBg = isDark ? "#1f2937" : "white"
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0"
  const portfolioColor = isDark ? "#f9fafb" : "#0f172a"
  const benchmarkColor = isDark ? "#6b7280" : "#94a3b8"
  const drawdownColor = isDark ? "#fb7185" : "#f43f5e"
  const drawdownFill = isDark ? "#4c1d30" : "#fecdd3"

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Return</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+25.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">vs Benchmark</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+8.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-xl font-semibold text-foreground">1.42</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                  <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Drawdown</p>
                  <p className="text-xl font-semibold text-rose-600 dark:text-rose-400">-12.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Cumulative Performance Chart */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground">Cumulative Performance</CardTitle>
                <div className="flex gap-1">
                  {["3m", "6m", "1y", "3y", "all"].map((period) => (
                    <Button
                      key={period}
                      variant={chartPeriod === period ? "default" : "ghost"}
                      size="sm"
                      className={`h-7 px-2 text-xs ${chartPeriod === period ? "" : "text-muted-foreground"}`}
                      onClick={() => setChartPeriod(period)}
                    >
                      {period.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tickColor }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tickColor }} domain={[95, 130]} />
                    <RechartsTooltip
                      formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        border: `1px solid ${tooltipBorder}`,
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
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

          {/* Drawdown Chart */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold text-foreground">Underwater Chart (Drawdown)</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[200px] text-sm">Shows the percentage decline from peak value over time</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={drawdownData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tickColor }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tickColor }} domain={[-15, 0]} tickFormatter={(value) => `${value}%`} />
                    <RechartsTooltip
                      formatter={(value: number) => [`${value.toFixed(1)}%`, "Drawdown"]}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        border: `1px solid ${tooltipBorder}`,
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="drawdown"
                      name="Drawdown"
                      stroke={drawdownColor}
                      fill={drawdownFill}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Period Returns Table */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Period Returns</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="text-xs font-medium text-muted-foreground">Period</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Portfolio</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Benchmark</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Excess</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {periodReturns.map((row) => (
                    <TableRow key={row.period} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground">{row.period}</TableCell>
                      <TableCell className={`text-right font-semibold ${row.portfolio >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {row.portfolio >= 0 ? "+" : ""}{row.portfolio.toFixed(1)}%
                      </TableCell>
                      <TableCell className={`text-right ${row.benchmark >= 0 ? "text-muted-foreground" : "text-rose-600 dark:text-rose-400"}`}>
                        {row.benchmark >= 0 ? "+" : ""}{row.benchmark.toFixed(1)}%
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${row.excess >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {row.excess >= 0 ? "+" : ""}{row.excess.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Risk Metrics Table */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="text-xs font-medium text-muted-foreground">Metric</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Portfolio</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Benchmark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskMetrics.map((row) => (
                    <TableRow key={row.metric} className="border-border hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-foreground">{row.metric}</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px] text-sm">{row.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">{row.value}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{row.benchmark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Returns Heatmap */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Monthly Returns Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-medium text-muted-foreground">Month</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Portfolio</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Benchmark</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyReturns.map((row) => {
                  const diff = row.portfolio - row.benchmark
                  return (
                    <TableRow key={row.month} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground">{row.month}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block min-w-[60px] rounded px-2 py-0.5 text-sm font-semibold ${row.portfolio >= 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}>
                          {row.portfolio >= 0 ? "+" : ""}{row.portfolio.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block min-w-[60px] rounded px-2 py-0.5 text-sm ${row.benchmark >= 0 ? "bg-muted text-muted-foreground" : "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"}`}>
                          {row.benchmark >= 0 ? "+" : ""}{row.benchmark.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block min-w-[60px] rounded px-2 py-0.5 text-sm font-semibold ${diff >= 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}>
                          {diff >= 0 ? "+" : ""}{diff.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
