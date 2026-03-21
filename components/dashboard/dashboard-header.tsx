"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Upload, RefreshCcw, ChevronDown, TrendingUp, Shield, Wallet, Filter, Calendar } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { AddTransactionModal } from "./modals/add-transaction-modal"
import { ImportModal } from "./modals/import-modal"
import { RebalanceModal } from "./modals/rebalance-modal"
import { CreatePortfolioModal } from "./modals/create-portfolio-modal"
import { ThemeToggle } from "@/components/theme-toggle"

const portfolios = [
  { id: "tgf", name: "Tech Growth Fund", code: "TGF", benchmark: "VNINDEX", icon: TrendingUp, nav: "1.5B", return: "+25.4%" },
  { id: "div", name: "Dividend Income", code: "DIV", benchmark: "VN30", icon: Wallet, nav: "850M", return: "+12.8%" },
  { id: "bal", name: "Balanced Portfolio", code: "BAL", benchmark: "VNINDEX", icon: Shield, nav: "620M", return: "+18.2%" },
]

export function DashboardHeader() {
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfolios[0])
  const [addTransactionOpen, setAddTransactionOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [rebalanceOpen, setRebalanceOpen] = useState(false)
  const [createPortfolioOpen, setCreatePortfolioOpen] = useState(false)
  
  // Filters
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [datePreset, setDatePreset] = useState("ytd")

  const handlePortfolioChange = (portfolioId: string) => {
    const portfolio = portfolios.find((p) => p.id === portfolioId)
    if (portfolio) {
      setSelectedPortfolio(portfolio)
    }
  }

  const handleDatePresetChange = (preset: string) => {
    setDatePreset(preset)
    const today = new Date()
    let from: Date | undefined
    
    switch (preset) {
      case "1m":
        from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        break
      case "3m":
        from = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
        break
      case "6m":
        from = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
        break
      case "ytd":
        from = new Date(today.getFullYear(), 0, 1)
        break
      case "1y":
        from = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
        break
      case "all":
        from = undefined
        break
      default:
        from = undefined
    }
    
    setDateRange({ from, to: today })
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Top Row: Portfolio Selector and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto gap-2 p-0 hover:bg-transparent">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                        <selectedPortfolio.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-semibold text-foreground">{selectedPortfolio.name}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-72">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Your Portfolios</div>
                    {portfolios.map((portfolio) => (
                      <DropdownMenuItem
                        key={portfolio.id}
                        onClick={() => handlePortfolioChange(portfolio.id)}
                        className="flex items-center gap-3 py-3"
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          selectedPortfolio.id === portfolio.id ? "bg-primary" : "bg-secondary"
                        }`}>
                          <portfolio.icon className={`h-5 w-5 ${
                            selectedPortfolio.id === portfolio.id ? "text-primary-foreground" : "text-secondary-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{portfolio.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>NAV: {portfolio.nav}</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{portfolio.return}</span>
                          </div>
                        </div>
                        {selectedPortfolio.id === portfolio.id && (
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        )}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setCreatePortfolioOpen(true)}
                      className="flex items-center gap-3 py-3 text-muted-foreground"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-dashed border-border">
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">Create New Portfolio</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Badge variant="secondary">
                  {selectedPortfolio.code}
                </Badge>
                <Badge variant="outline">
                  Benchmark: {selectedPortfolio.benchmark}
                </Badge>
              </div>
              <p className="ml-12 text-sm text-muted-foreground">As of {format(new Date(), "MMM d, yyyy")}</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setImportOpen(true)}
              >
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setRebalanceOpen(true)}
              >
                <RefreshCcw className="h-4 w-4" />
                Rebalance
              </Button>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={() => setAddTransactionOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>

            {/* Date Range Preset */}
            <Select value={datePreset} onValueChange={handleDatePresetChange}>
              <SelectTrigger className="w-32 bg-background">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="ytd">YTD</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {/* Custom Date Range */}
            {datePreset === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM d, yyyy")
                      )
                    ) : (
                      "Select dates"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}

            {/* Quick Stats */}
            <div className="ml-auto flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">NAV:</span>
                <span className="font-semibold text-foreground">{selectedPortfolio.nav} VND</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Return:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedPortfolio.return}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AddTransactionModal 
        open={addTransactionOpen} 
        onOpenChange={setAddTransactionOpen} 
      />
      <ImportModal 
        open={importOpen} 
        onOpenChange={setImportOpen} 
      />
      <RebalanceModal 
        open={rebalanceOpen} 
        onOpenChange={setRebalanceOpen} 
      />
      <CreatePortfolioModal 
        open={createPortfolioOpen} 
        onOpenChange={setCreatePortfolioOpen} 
      />
    </>
  )
}
