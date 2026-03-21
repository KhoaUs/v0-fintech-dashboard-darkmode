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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Plus,
} from "lucide-react"

interface AddCashFlowModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd?: (data: { type: string; amount: number; date: Date; description: string; category: string }) => void
}

const depositCategories = [
  { value: "contribution", label: "Monthly Contribution" },
  { value: "bonus", label: "Bonus Allocation" },
  { value: "transfer", label: "Transfer In" },
  { value: "dividend_reinvest", label: "Dividend Reinvestment" },
  { value: "other", label: "Other" },
]

const withdrawalCategories = [
  { value: "redemption", label: "Redemption" },
  { value: "expense", label: "Personal Expense" },
  { value: "transfer", label: "Transfer Out" },
  { value: "fee", label: "Management Fee" },
  { value: "tax", label: "Tax Payment" },
  { value: "other", label: "Other" },
]

export function AddCashFlowModal({ open, onOpenChange, onAdd }: AddCashFlowModalProps) {
  const [flowType, setFlowType] = useState<"deposit" | "withdrawal">("deposit")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    onAdd?.({
      type: flowType,
      amount: parseFloat(amount) || 0,
      date,
      description,
      category,
    })
    // Reset form
    setAmount("")
    setCategory("")
    setDescription("")
    onOpenChange(false)
  }

  const categories = flowType === "deposit" ? depositCategories : withdrawalCategories

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Wallet className="h-5 w-5" />
            Add Cash Flow
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Record a deposit or withdrawal for your portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Flow Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setFlowType("deposit")
                setCategory("")
              }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg border-2 py-4 font-medium transition-colors",
                flowType === "deposit"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
              )}
            >
              <ArrowUpRight className="h-5 w-5" />
              Deposit
            </button>
            <button
              type="button"
              onClick={() => {
                setFlowType("withdrawal")
                setCategory("")
              }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg border-2 py-4 font-medium transition-colors",
                flowType === "withdrawal"
                  ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
              )}
            >
              <ArrowDownRight className="h-5 w-5" />
              Withdrawal
            </button>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (VND)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="text-lg"
            />
            {/* Quick Amount Buttons */}
            <div className="flex gap-2">
              {[100, 250, 500, 1000].map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount((val * 1000000).toString())}
                  className="flex-1 text-xs"
                >
                  {val}M
                </Button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
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

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this transaction..."
              className="min-h-[80px]"
            />
          </div>

          {/* Summary */}
          {amount && (
            <div className={cn(
              "rounded-lg p-4",
              flowType === "deposit" ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
            )}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {flowType === "deposit" ? "Deposit Amount" : "Withdrawal Amount"}
                  </p>
                  <p className="text-xs text-muted-foreground/70">{format(date, "MMMM d, yyyy")}</p>
                </div>
                <p className={cn(
                  "text-2xl font-semibold",
                  flowType === "deposit" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}>
                  {flowType === "deposit" ? "+" : "-"}
                  {(parseFloat(amount) / 1000000).toFixed(0)}M VND
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0}
            className={cn(
              "gap-2",
              flowType === "deposit"
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-rose-600 text-white hover:bg-rose-700"
            )}
          >
            <Plus className="h-4 w-4" />
            Add {flowType === "deposit" ? "Deposit" : "Withdrawal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
