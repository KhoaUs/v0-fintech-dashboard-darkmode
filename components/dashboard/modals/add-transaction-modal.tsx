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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, Plus, ArrowUpRight, ArrowDownRight, Banknote, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const popularStocks = [
  { ticker: "FPT", name: "FPT Corporation", price: 94500 },
  { ticker: "VNM", name: "Vinamilk", price: 78200 },
  { ticker: "VCB", name: "Vietcombank", price: 92400 },
  { ticker: "HPG", name: "Hoa Phat Group", price: 31500 },
  { ticker: "TCB", name: "Techcombank", price: 35500 },
  { ticker: "MWG", name: "Mobile World", price: 52800 },
  { ticker: "MSN", name: "Masan Group", price: 88900 },
  { ticker: "VHM", name: "Vinhomes", price: 53200 },
]

export function AddTransactionModal({ open, onOpenChange }: AddTransactionModalProps) {
  const [transactionType, setTransactionType] = useState("buy")
  const [date, setDate] = useState<Date>(new Date())
  const [selectedStock, setSelectedStock] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [fees, setFees] = useState("0.1")
  const [notes, setNotes] = useState("")

  // For dividend
  const [dividendAmount, setDividendAmount] = useState("")
  const [exDate, setExDate] = useState<Date>()
  const [paymentDate, setPaymentDate] = useState<Date>()

  // For cash deposit/withdrawal
  const [cashType, setCashType] = useState("deposit")
  const [cashAmount, setCashAmount] = useState("")
  const [cashDescription, setCashDescription] = useState("")

  const filteredStocks = popularStocks.filter(
    (stock) =>
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedStockData = popularStocks.find((s) => s.ticker === selectedStock)

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0
    const prc = parseFloat(price) || 0
    const feePercent = parseFloat(fees) || 0
    const subtotal = qty * prc
    const feeAmount = subtotal * (feePercent / 100)
    return { subtotal, feeAmount, total: subtotal + (transactionType === "buy" ? feeAmount : -feeAmount) }
  }

  const { subtotal, feeAmount, total } = calculateTotal()

  const handleStockSelect = (ticker: string) => {
    setSelectedStock(ticker)
    const stock = popularStocks.find((s) => s.ticker === ticker)
    if (stock) {
      setPrice(stock.price.toString())
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Transaction submitted")
    onOpenChange(false)
    // Reset form
    setSelectedStock("")
    setQuantity("")
    setPrice("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Add Transaction</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Record a new transaction for your portfolio
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="trade" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trade" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trade
            </TabsTrigger>
            <TabsTrigger value="dividend" className="gap-2">
              <Banknote className="h-4 w-4" />
              Dividend
            </TabsTrigger>
            <TabsTrigger value="cash" className="gap-2">
              <Plus className="h-4 w-4" />
              Cash
            </TabsTrigger>
          </TabsList>

          {/* Trade Tab */}
          <TabsContent value="trade" className="mt-4 space-y-4">
            {/* Transaction Type */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransactionType("buy")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-medium transition-colors",
                  transactionType === "buy"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                )}
              >
                <ArrowUpRight className="h-5 w-5" />
                Buy
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("sell")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-medium transition-colors",
                  transactionType === "sell"
                    ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                )}
              >
                <ArrowDownRight className="h-5 w-5" />
                Sell
              </button>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Transaction Date</Label>
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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

            {/* Stock Selection */}
            <div className="space-y-2">
              <Label>Stock</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by ticker or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searchQuery && (
                <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.ticker}
                      type="button"
                      onClick={() => {
                        handleStockSelect(stock.ticker)
                        setSearchQuery("")
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50"
                    >
                      <div>
                        <span className="font-semibold text-slate-900">{stock.ticker}</span>
                        <span className="ml-2 text-sm text-slate-500">{stock.name}</span>
                      </div>
                      <span className="text-sm text-slate-600">
                        {stock.price.toLocaleString()} VND
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {selectedStock && (
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">
                      {selectedStock.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{selectedStock}</p>
                      <p className="text-sm text-slate-500">{selectedStockData?.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStock("")}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Change
                  </Button>
                </div>
              )}
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price (VND)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Fees */}
            <div className="space-y-2">
              <Label>Fees (%)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.1"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>

            {/* Summary */}
            {quantity && price && (
              <div className="rounded-lg bg-slate-50 p-4">
                <h4 className="mb-3 font-medium text-slate-900">Transaction Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-700">{subtotal.toLocaleString()} VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fees ({fees}%)</span>
                    <span className="text-slate-700">{feeAmount.toLocaleString()} VND</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-700">Total</span>
                      <span className={transactionType === "buy" ? "text-rose-600" : "text-emerald-600"}>
                        {transactionType === "buy" ? "-" : "+"}{total.toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Input
                placeholder="Add any notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </TabsContent>

          {/* Dividend Tab */}
          <TabsContent value="dividend" className="mt-4 space-y-4">
            {/* Stock Selection */}
            <div className="space-y-2">
              <Label>Stock</Label>
              <Select value={selectedStock} onValueChange={handleStockSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  {popularStocks.map((stock) => (
                    <SelectItem key={stock.ticker} value={stock.ticker}>
                      {stock.ticker} - {stock.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ex-Dividend Date */}
            <div className="space-y-2">
              <Label>Ex-Dividend Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !exDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {exDate ? format(exDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={exDate}
                    onSelect={setExDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Payment Date */}
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !paymentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {paymentDate ? format(paymentDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={paymentDate}
                    onSelect={setPaymentDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Dividend per Share */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dividend per Share (VND)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={dividendAmount}
                  onChange={(e) => setDividendAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Number of Shares</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            {/* Total Dividend */}
            {dividendAmount && quantity && (
              <div className="rounded-lg bg-emerald-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Total Dividend</span>
                  <span className="text-xl font-semibold text-emerald-600">
                    +{(parseFloat(dividendAmount) * parseFloat(quantity)).toLocaleString()} VND
                  </span>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Cash Tab */}
          <TabsContent value="cash" className="mt-4 space-y-4">
            {/* Cash Type */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCashType("deposit")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-medium transition-colors",
                  cashType === "deposit"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                <ArrowUpRight className="h-5 w-5" />
                Deposit
              </button>
              <button
                type="button"
                onClick={() => setCashType("withdrawal")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-medium transition-colors",
                  cashType === "withdrawal"
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                <ArrowDownRight className="h-5 w-5" />
                Withdrawal
              </button>
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount (VND)</Label>
              <Input
                type="number"
                placeholder="0"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="e.g., Monthly contribution, Withdrawal for expenses..."
                value={cashDescription}
                onChange={(e) => setCashDescription(e.target.value)}
              />
            </div>

            {/* Summary */}
            {cashAmount && (
              <div className={cn(
                "rounded-lg p-4",
                cashType === "deposit" ? "bg-emerald-50" : "bg-rose-50"
              )}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">
                    {cashType === "deposit" ? "Deposit Amount" : "Withdrawal Amount"}
                  </span>
                  <span className={cn(
                    "text-xl font-semibold",
                    cashType === "deposit" ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {cashType === "deposit" ? "+" : "-"}{parseFloat(cashAmount).toLocaleString()} VND
                  </span>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-slate-900 text-white hover:bg-slate-800">
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
