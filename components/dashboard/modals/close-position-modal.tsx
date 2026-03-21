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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  CalendarIcon,
  TrendingDown,
  Percent,
  DollarSign,
} from "lucide-react"

interface ClosePositionModalProps {
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
  onClose?: (data: { closeType: string; quantity: number; price: number; date: Date }) => void
}

export function ClosePositionModal({ open, onOpenChange, holding, onClose }: ClosePositionModalProps) {
  const [closeType, setCloseType] = useState("full")
  const [sellQuantity, setSellQuantity] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [fees, setFees] = useState("0.25")

  if (!holding) return null

  const quantityToSell = closeType === "full" ? holding.quantity : (parseFloat(sellQuantity) || 0)
  const pricePerShare = parseFloat(sellPrice) || holding.currentPrice
  const grossProceeds = quantityToSell * pricePerShare
  const feeAmount = grossProceeds * (parseFloat(fees) / 100)
  const netProceeds = grossProceeds - feeAmount
  const costBasis = quantityToSell * holding.avgCost
  const realizedPnL = netProceeds - costBasis
  const realizedPnLPercent = costBasis > 0 ? (realizedPnL / costBasis) * 100 : 0

  const handleClose = () => {
    onClose?.({
      closeType,
      quantity: quantityToSell,
      price: pricePerShare,
      date,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <TrendingDown className="h-5 w-5 text-rose-500" />
            Close Position
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Sell shares to close your position in {holding.ticker}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Stock Info */}
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">
                {holding.ticker.slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{holding.ticker}</p>
                <p className="text-sm text-slate-500">{holding.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Current Holdings</p>
              <p className="font-semibold text-slate-900">{holding.quantity.toLocaleString()} shares</p>
            </div>
          </div>

          {/* Close Type Selection */}
          <div className="space-y-3">
            <Label>Closing Method</Label>
            <RadioGroup value={closeType} onValueChange={setCloseType} className="grid grid-cols-2 gap-3">
              <div className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                closeType === "full"
                  ? "border-rose-500 bg-rose-50"
                  : "border-slate-200 hover:border-slate-300"
              )}>
                <RadioGroupItem value="full" id="full" className="border-rose-500 text-rose-500" />
                <div>
                  <Label htmlFor="full" className="cursor-pointer font-medium text-slate-900">
                    Full Close
                  </Label>
                  <p className="text-sm text-slate-500">Sell all {holding.quantity.toLocaleString()} shares</p>
                </div>
              </div>
              <div className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                closeType === "partial"
                  ? "border-amber-500 bg-amber-50"
                  : "border-slate-200 hover:border-slate-300"
              )}>
                <RadioGroupItem value="partial" id="partial" className="border-amber-500 text-amber-500" />
                <div>
                  <Label htmlFor="partial" className="cursor-pointer font-medium text-slate-900">
                    Partial Close
                  </Label>
                  <p className="text-sm text-slate-500">Sell specific quantity</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Partial Close Quantity */}
          {closeType === "partial" && (
            <div className="space-y-2">
              <Label htmlFor="sellQuantity">Quantity to Sell</Label>
              <Input
                id="sellQuantity"
                type="number"
                value={sellQuantity}
                onChange={(e) => setSellQuantity(e.target.value)}
                placeholder="0"
                max={holding.quantity}
              />
              <div className="flex gap-2">
                {[25, 50, 75].map((pct) => (
                  <Button
                    key={pct}
                    variant="outline"
                    size="sm"
                    onClick={() => setSellQuantity(Math.floor(holding.quantity * (pct / 100)).toString())}
                    className="flex-1"
                  >
                    {pct}%
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Sell Price and Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sellPrice">Sell Price (VND)</Label>
              <Input
                id="sellPrice"
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder={holding.currentPrice.toString()}
              />
              <p className="text-xs text-slate-500">
                Market: {holding.currentPrice.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Sell Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Fees */}
          <div className="space-y-2">
            <Label htmlFor="fees">Fees & Tax (%)</Label>
            <div className="relative">
              <Input
                id="fees"
                type="number"
                step="0.01"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="pr-8"
              />
              <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Transaction Summary */}
          <div className={cn(
            "rounded-lg p-4",
            realizedPnL >= 0 ? "bg-emerald-50" : "bg-rose-50"
          )}>
            <h4 className="mb-3 flex items-center gap-2 font-medium text-slate-900">
              <DollarSign className="h-4 w-4" />
              Transaction Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Shares to Sell</span>
                <span className="font-medium text-slate-700">{quantityToSell.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Proceeds</span>
                <span className="font-medium text-slate-700">{grossProceeds.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fees & Tax ({fees}%)</span>
                <span className="font-medium text-rose-600">-{feeAmount.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Net Proceeds</span>
                <span className="font-medium text-slate-700">{netProceeds.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cost Basis</span>
                <span className="font-medium text-slate-700">{costBasis.toLocaleString()} VND</span>
              </div>
              <div className="border-t border-slate-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Realized P&L</span>
                  <span className={realizedPnL >= 0 ? "text-emerald-600" : "text-rose-600"}>
                    {realizedPnL >= 0 ? "+" : ""}{realizedPnL.toLocaleString()} VND ({realizedPnLPercent >= 0 ? "+" : ""}{realizedPnLPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
            <div className="text-sm">
              <p className="font-medium text-amber-700">Important</p>
              <p className="text-amber-600">
                This will record a sell transaction in your portfolio. Make sure the details are correct before proceeding.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            className="gap-2 bg-rose-600 text-white hover:bg-rose-700"
            disabled={closeType === "partial" && (!sellQuantity || parseFloat(sellQuantity) <= 0)}
          >
            <TrendingDown className="h-4 w-4" />
            {closeType === "full" ? "Close Full Position" : "Sell Shares"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
