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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowRight,
  Lock,
  Unlock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RebalanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const currentHoldings = [
  { ticker: "FPT", name: "FPT Corporation", currentWeight: 15.2, targetWeight: 15.0, value: 228000000, locked: false },
  { ticker: "VCB", name: "Vietcombank", currentWeight: 12.8, targetWeight: 12.0, value: 192000000, locked: false },
  { ticker: "VNM", name: "Vinamilk", currentWeight: 11.5, targetWeight: 10.0, value: 172500000, locked: false },
  { ticker: "HPG", name: "Hoa Phat Group", currentWeight: 10.2, targetWeight: 10.0, value: 153000000, locked: false },
  { ticker: "TCB", name: "Techcombank", currentWeight: 9.8, targetWeight: 12.0, value: 147000000, locked: false },
  { ticker: "MWG", name: "Mobile World", currentWeight: 8.5, targetWeight: 8.0, value: 127500000, locked: false },
  { ticker: "MSN", name: "Masan Group", currentWeight: 7.2, targetWeight: 8.0, value: 108000000, locked: false },
  { ticker: "VHM", name: "Vinhomes", currentWeight: 6.8, targetWeight: 7.0, value: 102000000, locked: false },
  { ticker: "GAS", name: "PV Gas", currentWeight: 5.5, targetWeight: 6.0, value: 82500000, locked: false },
  { ticker: "PLX", name: "Petrolimex", currentWeight: 4.3, targetWeight: 5.0, value: 64500000, locked: false },
  { ticker: "CASH", name: "Cash", currentWeight: 8.2, targetWeight: 7.0, value: 123000000, locked: true },
]

const sectorAllocations = [
  { sector: "Technology", currentWeight: 23.7, targetWeight: 25.0 },
  { sector: "Financial", currentWeight: 22.6, targetWeight: 24.0 },
  { sector: "Consumer", currentWeight: 20.0, targetWeight: 18.0 },
  { sector: "Industrial", currentWeight: 10.2, targetWeight: 10.0 },
  { sector: "Energy", currentWeight: 9.8, targetWeight: 11.0 },
  { sector: "Real Estate", currentWeight: 6.8, targetWeight: 7.0 },
  { sector: "Cash", currentWeight: 6.9, targetWeight: 5.0 },
]

function formatCurrency(value: number) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  return value.toLocaleString()
}

export function RebalanceModal({ open, onOpenChange }: RebalanceModalProps) {
  const [holdings, setHoldings] = useState(currentHoldings)
  const [rebalanceType, setRebalanceType] = useState("holdings")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const totalWeight = holdings.reduce((sum, h) => sum + h.targetWeight, 0)
  const isValidAllocation = Math.abs(totalWeight - 100) < 0.1

  const suggestedTrades = holdings
    .filter((h) => !h.locked && Math.abs(h.currentWeight - h.targetWeight) > 0.5)
    .map((h) => {
      const diff = h.targetWeight - h.currentWeight
      const tradeValue = Math.abs((diff / 100) * 1500000000)
      return {
        ...h,
        action: diff > 0 ? "BUY" : "SELL",
        diff: Math.abs(diff).toFixed(1),
        tradeValue,
        shares: Math.round(tradeValue / (h.value / (h.currentWeight / 100) / 1000)),
      }
    })
    .sort((a, b) => b.tradeValue - a.tradeValue)

  const handleTargetWeightChange = (ticker: string, value: number) => {
    setHoldings((prev) =>
      prev.map((h) => (h.ticker === ticker ? { ...h, targetWeight: value } : h))
    )
  }

  const handleLockToggle = (ticker: string) => {
    setHoldings((prev) =>
      prev.map((h) => (h.ticker === ticker ? { ...h, locked: !h.locked } : h))
    )
  }

  const handleResetToModel = () => {
    setHoldings(currentHoldings.map((h) => ({ ...h, targetWeight: h.currentWeight })))
  }

  const handleApplyModel = () => {
    // Apply model portfolio weights
    setHoldings(currentHoldings)
    setShowSuggestions(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <RefreshCcw className="h-5 w-5" />
            Portfolio Rebalance
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Adjust your portfolio allocation to match your target weights
          </DialogDescription>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">Portfolio Value</p>
            <p className="text-lg font-semibold text-foreground">1.5B VND</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">Tracking Error</p>
            <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">2.3%</p>
          </div>
          <div className={cn(
            "rounded-lg p-3",
            isValidAllocation ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
          )}>
            <p className="text-sm text-muted-foreground">Total Allocation</p>
            <p className={cn(
              "text-lg font-semibold",
              isValidAllocation ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}>
              {totalWeight.toFixed(1)}%
              {!isValidAllocation && (
                <span className="ml-1 text-xs">
                  ({totalWeight > 100 ? "+" : ""}{(totalWeight - 100).toFixed(1)}%)
                </span>
              )}
            </p>
          </div>
        </div>

        <Tabs value={rebalanceType} onValueChange={setRebalanceType} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="holdings">
              By Holdings
            </TabsTrigger>
            <TabsTrigger value="sector">
              By Sector
            </TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="mt-4">
            <div className="max-h-80 overflow-y-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="text-xs font-medium">Holding</TableHead>
                    <TableHead className="text-center text-xs font-medium">Current %</TableHead>
                    <TableHead className="w-48 text-center text-xs font-medium">Target %</TableHead>
                    <TableHead className="text-center text-xs font-medium">Diff</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdings.map((holding) => {
                    const diff = holding.targetWeight - holding.currentWeight
                    return (
                      <TableRow key={holding.ticker} className="hover:bg-muted/50">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleLockToggle(holding.ticker)}
                            disabled={holding.ticker === "CASH"}
                          >
                            {holding.locked ? (
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            ) : (
                              <Unlock className="h-3 w-3 text-muted-foreground/50" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                              {holding.ticker.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{holding.ticker}</p>
                              <p className="text-xs text-muted-foreground">{formatCurrency(holding.value)}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm text-muted-foreground">{holding.currentWeight.toFixed(1)}%</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[holding.targetWeight]}
                              onValueChange={(value) => handleTargetWeightChange(holding.ticker, value[0])}
                              max={30}
                              step={0.5}
                              disabled={holding.locked}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              value={holding.targetWeight.toFixed(1)}
                              onChange={(e) => handleTargetWeightChange(holding.ticker, parseFloat(e.target.value) || 0)}
                              disabled={holding.locked}
                              className="w-16 text-center text-sm"
                              step="0.5"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="secondary"
                            className={cn(
                              Math.abs(diff) < 0.5
                                ? "bg-muted text-muted-foreground"
                                : diff > 0
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                            )}
                          >
                            {diff > 0 ? "+" : ""}{diff.toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={handleResetToModel}>
                Reset to Current
              </Button>
              <Button variant="outline" size="sm" onClick={handleApplyModel}>
                Apply Model Portfolio
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Info className="h-4 w-4 text-slate-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Lock positions to exclude them from rebalancing</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>

          <TabsContent value="sector" className="mt-4">
            <div className="space-y-4">
              {sectorAllocations.map((sector) => {
                const diff = sector.targetWeight - sector.currentWeight
                return (
                  <div key={sector.sector} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{sector.sector}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {sector.currentWeight.toFixed(1)}%
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {sector.targetWeight.toFixed(1)}%
                        </span>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "w-16 justify-center",
                            Math.abs(diff) < 0.5
                              ? "bg-muted text-muted-foreground"
                              : diff > 0
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                          )}
                        >
                          {diff > 0 ? "+" : ""}{diff.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="relative h-2 rounded-full bg-muted">
                      <div
                        className="absolute h-2 rounded-full bg-muted-foreground/40"
                        style={{ width: `${sector.currentWeight}%` }}
                      />
                      <div
                        className="absolute top-0 h-2 w-0.5 bg-foreground"
                        style={{ left: `${sector.targetWeight}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Suggested Trades */}
        {showSuggestions && suggestedTrades.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <h4 className="font-medium text-foreground">Suggested Trades</h4>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/30 p-4">
              <div className="space-y-2">
                {suggestedTrades.map((trade) => (
                  <div
                    key={trade.ticker}
                    className="flex items-center justify-between rounded bg-card px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          trade.action === "BUY"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        )}
                      >
                        {trade.action}
                      </Badge>
                      <span className="font-medium text-foreground">{trade.ticker}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        ~{trade.shares.toLocaleString()} shares
                      </span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(trade.tradeValue)} VND
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                * These are suggested trades to achieve your target allocation. Review and adjust as needed.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => setShowSuggestions(true)}
            disabled={!isValidAllocation}
          >
            Generate Trades
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
