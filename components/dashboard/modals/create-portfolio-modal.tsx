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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, TrendingUp, Wallet, Shield, Target, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreatePortfolioModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const portfolioTypes = [
  { id: "growth", name: "Growth", icon: TrendingUp, description: "Focus on capital appreciation" },
  { id: "income", name: "Dividend Income", icon: Wallet, description: "Focus on dividend yield" },
  { id: "balanced", name: "Balanced", icon: Shield, description: "Mix of growth and income" },
  { id: "index", name: "Index Tracking", icon: Target, description: "Track a market index" },
  { id: "custom", name: "Custom", icon: Briefcase, description: "Create your own strategy" },
]

const benchmarks = [
  { value: "VNINDEX", label: "VN-Index" },
  { value: "VN30", label: "VN30" },
  { value: "HNX", label: "HNX-Index" },
  { value: "VNMID", label: "VN Mid Cap" },
  { value: "VNSML", label: "VN Small Cap" },
  { value: "NONE", label: "No Benchmark" },
]

const currencies = [
  { value: "VND", label: "Vietnamese Dong (VND)" },
  { value: "USD", label: "US Dollar (USD)" },
]

export function CreatePortfolioModal({ open, onOpenChange }: CreatePortfolioModalProps) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [portfolioType, setPortfolioType] = useState("")
  const [benchmark, setBenchmark] = useState("VNINDEX")
  const [currency, setCurrency] = useState("VND")
  const [initialCash, setInitialCash] = useState("")
  const [inceptionDate, setInceptionDate] = useState<Date>(new Date())
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    // Handle portfolio creation
    console.log("Portfolio created:", { name, code, portfolioType, benchmark, currency, initialCash, inceptionDate, description })
    onOpenChange(false)
    // Reset form
    setName("")
    setCode("")
    setPortfolioType("")
    setBenchmark("VNINDEX")
    setCurrency("VND")
    setInitialCash("")
    setDescription("")
  }

  const generateCode = (portfolioName: string) => {
    const words = portfolioName.trim().split(" ")
    if (words.length >= 2) {
      return words.map(w => w[0]).join("").toUpperCase().slice(0, 4)
    }
    return portfolioName.slice(0, 3).toUpperCase()
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (!code || code === generateCode(name)) {
      setCode(generateCode(value))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">Create New Portfolio</DialogTitle>
          <DialogDescription className="text-slate-500">
            Set up a new portfolio to track your investments
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* Portfolio Type Selection */}
          <div className="space-y-2">
            <Label>Portfolio Type</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {portfolioTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPortfolioType(type.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-center transition-colors",
                    portfolioType === type.id
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <type.icon className={cn(
                    "h-5 w-5",
                    portfolioType === type.id ? "text-slate-900" : "text-slate-400"
                  )} />
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      portfolioType === type.id ? "text-slate-900" : "text-slate-600"
                    )}>
                      {type.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Name and Code */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Portfolio Name</Label>
              <Input
                id="name"
                placeholder="e.g., Tech Growth Fund"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                placeholder="TGF"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={5}
              />
            </div>
          </div>

          {/* Benchmark and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Benchmark</Label>
              <Select value={benchmark} onValueChange={setBenchmark}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {benchmarks.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Initial Cash and Inception Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialCash">Initial Cash ({currency})</Label>
              <Input
                id="initialCash"
                type="number"
                placeholder="0"
                value={initialCash}
                onChange={(e) => setInitialCash(e.target.value)}
              />
              {initialCash && (
                <p className="text-xs text-slate-500">
                  {parseFloat(initialCash).toLocaleString()} {currency}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Inception Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {inceptionDate ? format(inceptionDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={inceptionDate}
                    onSelect={(d) => d && setInceptionDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your investment strategy or goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name || !code || !portfolioType}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            Create Portfolio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
