"use client"

import { useState } from "react"
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

  if (!holding) return null

  const totalCost = holding.quantity * holding.avgCost
  const dayChange = holding.currentPrice - 94000 // mock previous close
  const dayChangePercent = (dayChange / 94000) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-lg font-bold text-white">
              {holding.ticker.slice(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">
                {holding.ticker}
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                {holding.name}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="ml-auto bg-slate-100 text-slate-700">
              {holding.sector}
            </Badge>
          </div>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Current Price</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatNumber(holding.currentPrice)}
            </p>
            <p className={`text-xs ${dayChange >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {dayChange >= 0 ? "+" : ""}{formatNumber(dayChange)} ({dayChangePercent >= 0 ? "+" : ""}{dayChangePercent.toFixed(2)}%)
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Market Value</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatCurrency(holding.marketValue)}
            </p>
            <p className="text-xs text-slate-500">{holding.weight.toFixed(2)}% of portfolio</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Unrealized P&L</p>
            <p className={`text-lg font-semibold ${holding.unrealizedPnL >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {holding.unrealizedPnL >= 0 ? "+" : ""}{formatCurrency(holding.unrealizedPnL)}
            </p>
            <p className={`text-xs ${holding.unrealizedPnL >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              {holding.unrealizedPnLPercent >= 0 ? "+" : ""}{holding.unrealizedPnLPercent.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3">
            <p className="text-xs text-slate-500">Realized P&L</p>
            <p className="text-lg font-semibold text-emerald-600">
              +{formatCurrency(holding.realizedPnL)}
            </p>
            <p className="text-xs text-slate-500">All time</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-white">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2 data-[state=active]:bg-white">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2 data-[state=active]:bg-white">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Shares Held</span>
                  <span className="font-medium text-slate-900">{formatNumber(holding.quantity)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Average Cost</span>
                  <span className="font-medium text-slate-900">{formatNumber(holding.avgCost)} VND</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Total Cost Basis</span>
                  <span className="font-medium text-slate-900">{formatCurrency(totalCost)} VND</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Current Price</span>
                  <span className="font-medium text-slate-900">{formatNumber(holding.currentPrice)} VND</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">First Purchase</span>
                  <span className="font-medium text-slate-900">Sep 15, 2023</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Last Transaction</span>
                  <span className="font-medium text-slate-900">Mar 15, 2024</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Total Transactions</span>
                  <span className="font-medium text-slate-900">5</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-sm text-slate-500">Dividends Received</span>
                  <span className="font-medium text-emerald-600">+200M VND</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} domain={["dataMin - 5000", "dataMax + 5000"]} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    formatter={(value: number) => [`${formatNumber(value)} VND`, ""]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <ReferenceLine y={holding.avgCost} stroke="#94a3b8" strokeDasharray="5 5" label={{ value: "Avg Cost", position: "right", fill: "#64748b", fontSize: 11 }} />
                  <Line type="monotone" dataKey="price" name="Price" stroke="#0f172a" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#0f172a" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-4 rounded bg-slate-900" />
                <span className="text-slate-600">Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px w-4 border-t-2 border-dashed border-slate-400" />
                <span className="text-slate-600">Avg Cost ({formatNumber(holding.avgCost)})</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
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
                      <TableCell className="text-sm text-slate-600">{formatDate(tx.date)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            tx.type === "BUY"
                              ? "bg-emerald-100 text-emerald-700"
                              : tx.type === "SELL"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-700">
                        {formatNumber(tx.quantity)}
                      </TableCell>
                      <TableCell className="text-right text-slate-600">
                        {formatNumber(tx.price)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">
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
          <Button onClick={() => onOpenChange(false)} className="bg-slate-900 text-white hover:bg-slate-800">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
