"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Save, AlertTriangle } from "lucide-react"

interface EditPositionModalProps {
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
  onSave?: (data: { quantity: number; avgCost: number; notes: string }) => void
}

export function EditPositionModal({ open, onOpenChange, holding, onSave }: EditPositionModalProps) {
  const [quantity, setQuantity] = useState("")
  const [avgCost, setAvgCost] = useState("")
  const [notes, setNotes] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (holding) {
      setQuantity(holding.quantity.toString())
      setAvgCost(holding.avgCost.toString())
      setNotes("")
    }
  }, [holding])

  useEffect(() => {
    if (holding) {
      const qtyChanged = quantity !== holding.quantity.toString()
      const costChanged = avgCost !== holding.avgCost.toString()
      setHasChanges(qtyChanged || costChanged)
    }
  }, [quantity, avgCost, holding])

  if (!holding) return null

  const newMarketValue = (parseFloat(quantity) || 0) * holding.currentPrice
  const newCostBasis = (parseFloat(quantity) || 0) * (parseFloat(avgCost) || 0)
  const newUnrealizedPnL = newMarketValue - newCostBasis
  const newUnrealizedPnLPercent = newCostBasis > 0 ? ((newUnrealizedPnL / newCostBasis) * 100) : 0

  const handleSave = () => {
    if (hasChanges) {
      setShowConfirm(true)
    } else {
      onOpenChange(false)
    }
  }

  const handleConfirmSave = () => {
    onSave?.({
      quantity: parseFloat(quantity) || 0,
      avgCost: parseFloat(avgCost) || 0,
      notes,
    })
    setShowConfirm(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-slate-900">
              <Edit className="h-5 w-5" />
              Edit Position
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Manually adjust position details for {holding.ticker}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* Stock Info */}
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">
                {holding.ticker.slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{holding.ticker}</p>
                <p className="text-sm text-slate-500">{holding.name}</p>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (Shares)</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-slate-500">
                  Original: {holding.quantity.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgCost">Average Cost (VND)</Label>
                <Input
                  id="avgCost"
                  type="number"
                  value={avgCost}
                  onChange={(e) => setAvgCost(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-slate-500">
                  Original: {holding.avgCost.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Preview Changes */}
            {hasChanges && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">Preview Changes</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">New Market Value</p>
                    <p className="font-semibold text-slate-900">
                      {(newMarketValue / 1000000000).toFixed(2)}B VND
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">New Unrealized P&L</p>
                    <p className={`font-semibold ${newUnrealizedPnL >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {newUnrealizedPnL >= 0 ? "+" : ""}{(newUnrealizedPnL / 1000000000).toFixed(2)}B ({newUnrealizedPnLPercent >= 0 ? "+" : ""}{newUnrealizedPnLPercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Reason for Adjustment (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Correcting data entry error, stock split adjustment..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Position Update</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to manually adjust the position for {holding.ticker}. This will update your portfolio records but will not execute any trades.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave} className="bg-slate-900 hover:bg-slate-800">
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
