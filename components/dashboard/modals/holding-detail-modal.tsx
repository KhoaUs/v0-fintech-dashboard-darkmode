"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  History,
  ExternalLink,
} from "lucide-react"

interface HoldingDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  holding: {
    ticker: string
    name: string
    sector: string
    quantity: number
    avgCost: number
    currentPrice: number
    marketValue: number
    weight: number
    unrealizedPnL: number
    unrealizedPnLPercent: number
    realizedPnL: number
  } | null
}

const priceHistory = [
  { date: "Jan", price: 82000, avgCost: 85000 },
  { date: "Feb", price: 86500, avgCost: 85000 },
  { date: "Mar", price: 84000, avgCost: 85000 },
  { date: "Apr", price: 88000, avgCost: 85000 },
  { date: "May", price: 91000, avgCost: 85000 },
  { date: "Jun", price: 89500, avgCost: 85000 },
  { date: "Jul", price: 92000, avgCost: 85000 },
  { date: "Aug", price: 94500, avgCost: 85000 },
  { date: "Sep", price: 93000, avgCost: 85000 },
  { date: "Oct", price: 95200, avgCost: 85000 },
]

const transactionHistory = [
  { id: 1, date: "2024-03-15", type: "BUY", quantity: 5000, price: 94500, total: 472500000 },
  { id: 2, date: "2024-02-20", type: "BUY", quantity: 10000, price: 88000, total: 880000000 },
  { id: 3, date: "2024-01-10", type: "SELL", quantity: 3000, price: 86000, total: 258000000 },
  { id: 4, date: "2023-11-05", type: "BUY", quantity: 15000, price: 82500, total: 1237500000 },
  { id: 5, date: "2023-09-15", type: "DIVIDEND", quantity: 100000, price: 2000, total: 200000000 },
]

function formatCurrency(value: number) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  }
  return value.toLocaleString()
}

function formatNumber(value: number) {
  return value.toLocaleString()
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function HoldingDetailModal({ open, onOpenChange, holding }: HoldingDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { resolvedTheme } = useTheme()
  
  const isDark = resolvedTheme === "dark"
  const gridColor = isDark ? "#374151" : "#e2e8f0"
  const tickColor = isDark ? "#9ca3af" : "#64748b"
  const tooltipBg = isDark ? "#1f2937" : "#fff"
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0"
  const lineColor = isDark ? "#f9fafb" : "#0f172a"
  const referenceLineColor = isDark ? "#6b7280" : "#94a3b8"

  if (!holding) return null

  const totalCost = holding.quantity * holding.avgCost
  const dayChange = holding.currentPrice - 94000 // mock previous close
  const dayChangePercent = (dayChange / 94000) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
              {holding.ticker.slice(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                {holding.ticker}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {holding.name}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {holding.sector}
            </Badge>
          </div>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Current Price</p>
            <p className="text-lg font-semibold text-foreground">
              {formatNumber(holding.currentPrice)}
            </p>
            <p className={`text-xs ${dayChange >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {dayChange >= 0 ? "+" : ""}{formatNumber(dayChange)} ({dayChangePercent >= 0 ? "+" : ""}{dayChangePercent.toFixed(2)}%)
            </p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Market Value</p>
            <p className="text-lg font-semibold text-foreground">
              {formatCurrency(holding.marketValue)}
            </p>
            <p className="text-xs text-muted-foreground">{holding.weight.toFixed(2)}% of portfolio</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Unrealized P&L</p>
            <p className={`text-lg font-semibold ${holding.unrealizedPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {holding.unrealizedPnL >= 0 ? "+" : ""}{formatCurrency(holding.unrealizedPnL)}
            </p>
            <p className={`text-xs ${holding.unrealizedPnL >= 0 ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
              {holding.unrealizedPnLPercent >= 0 ? "+" : ""}{holding.unrealizedPnLPercent.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/30 p-3">
            <p className="text-xs text-muted-foreground">Realized P&L</p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(holding.realizedPnL)}
            </p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Shares Held</span>
                  <span className="font-medium text-foreground">{formatNumber(holding.quantity)}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Average Cost</span>
                  <span className="font-medium text-foreground">{formatNumber(holding.avgCost)} VND</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Total Cost Basis</span>
                  <span className="font-medium text-foreground">{formatCurrency(totalCost)} VND</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <span className="font-medium text-foreground">{formatNumber(holding.currentPrice)} VND</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">First Purchase</span>
                  <span className="font-medium text-foreground">Sep 15, 2023</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Last Transaction</span>
                  <span className="font-medium text-foreground">Mar 15, 2024</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Total Transactions</span>
                  <span className="font-medium text-foreground">5</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Dividends Received</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">+200M VND</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} domain={["dataMin - 5000", "dataMax + 5000"]} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    formatter={(value: number) => [`${formatNumber(value)} VND`, ""]}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <ReferenceLine y={holding.avgCost} stroke={referenceLineColor} strokeDasharray="5 5" label={{ value: "Avg Cost", position: "right", fill: tickColor, fontSize: 11 }} />
                  <Line type="monotone" dataKey="price" name="Price" stroke={lineColor} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: lineColor }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-4 rounded bg-foreground" />
                <span className="text-muted-foreground">Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px w-4 border-t-2 border-dashed border-muted-foreground" />
                <span className="text-muted-foreground">Avg Cost ({formatNumber(holding.avgCost)})</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="max-h-64 overflow-y-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs font-medium">Date</TableHead>
                    <TableHead className="text-xs font-medium">Type</TableHead>
                    <TableHead className="text-right text-xs font-medium">Quantity</TableHead>
                    <TableHead className="text-right text-xs font-medium">Price</TableHead>
                    <TableHead className="text-right text-xs font-medium">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(tx.date)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            tx.type === "BUY"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : tx.type === "SELL"
                              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatNumber(tx.quantity)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatNumber(tx.price)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatCurrency(tx.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View on Exchange
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
