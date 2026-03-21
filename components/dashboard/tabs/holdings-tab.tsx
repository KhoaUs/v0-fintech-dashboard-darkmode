"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowUpDown,
  Search,
  Download,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { HoldingDetailModal } from "../modals/holding-detail-modal"
import { EditPositionModal } from "../modals/edit-position-modal"
import { ClosePositionModal } from "../modals/close-position-modal"
import { ExportModal } from "../modals/export-modal"

const holdingsData = [
  {
    id: 1,
    ticker: "FPT",
    name: "FPT Corporation",
    sector: "Technology",
    quantity: 150000,
    avgCost: 85000,
    currentPrice: 95200,
    marketValue: 14280000000,
    weight: 9.52,
    unrealizedPnL: 1530000000,
    unrealizedPnLPercent: 12.0,
    realizedPnL: 320000000,
  },
  {
    id: 2,
    ticker: "HPG",
    name: "Hoa Phat Group",
    sector: "Materials",
    quantity: 200000,
    avgCost: 28500,
    currentPrice: 31200,
    marketValue: 6240000000,
    weight: 4.16,
    unrealizedPnL: 540000000,
    unrealizedPnLPercent: 9.47,
    realizedPnL: 180000000,
  },
  {
    id: 3,
    ticker: "MWG",
    name: "Mobile World Investment",
    sector: "Consumer",
    quantity: 80000,
    avgCost: 52000,
    currentPrice: 48500,
    marketValue: 3880000000,
    weight: 2.59,
    unrealizedPnL: -280000000,
    unrealizedPnLPercent: -6.73,
    realizedPnL: 95000000,
  },
  {
    id: 4,
    ticker: "VNM",
    name: "Vinamilk",
    sector: "Consumer Staples",
    quantity: 120000,
    avgCost: 72000,
    currentPrice: 78500,
    marketValue: 9420000000,
    weight: 6.28,
    unrealizedPnL: 780000000,
    unrealizedPnLPercent: 9.03,
    realizedPnL: 420000000,
  },
  {
    id: 5,
    ticker: "VCB",
    name: "Vietcombank",
    sector: "Financials",
    quantity: 100000,
    avgCost: 88000,
    currentPrice: 92400,
    marketValue: 9240000000,
    weight: 6.16,
    unrealizedPnL: 440000000,
    unrealizedPnLPercent: 5.0,
    realizedPnL: 290000000,
  },
  {
    id: 6,
    ticker: "TCB",
    name: "Techcombank",
    sector: "Financials",
    quantity: 180000,
    avgCost: 32500,
    currentPrice: 35800,
    marketValue: 6444000000,
    weight: 4.3,
    unrealizedPnL: 594000000,
    unrealizedPnLPercent: 10.15,
    realizedPnL: 210000000,
  },
  {
    id: 7,
    ticker: "VHM",
    name: "Vinhomes",
    sector: "Real Estate",
    quantity: 90000,
    avgCost: 58000,
    currentPrice: 52300,
    marketValue: 4707000000,
    weight: 3.14,
    unrealizedPnL: -513000000,
    unrealizedPnLPercent: -9.83,
    realizedPnL: 150000000,
  },
  {
    id: 8,
    ticker: "MSN",
    name: "Masan Group",
    sector: "Consumer",
    quantity: 75000,
    avgCost: 82000,
    currentPrice: 89500,
    marketValue: 6712500000,
    weight: 4.48,
    unrealizedPnL: 562500000,
    unrealizedPnLPercent: 9.15,
    realizedPnL: 175000000,
  },
  {
    id: 9,
    ticker: "GAS",
    name: "PV Gas",
    sector: "Energy",
    quantity: 60000,
    avgCost: 95000,
    currentPrice: 102800,
    marketValue: 6168000000,
    weight: 4.11,
    unrealizedPnL: 468000000,
    unrealizedPnLPercent: 8.21,
    realizedPnL: 380000000,
  },
  {
    id: 10,
    ticker: "PLX",
    name: "Petrolimex",
    sector: "Energy",
    quantity: 110000,
    avgCost: 38500,
    currentPrice: 41200,
    marketValue: 4532000000,
    weight: 3.02,
    unrealizedPnL: 297000000,
    unrealizedPnLPercent: 7.01,
    realizedPnL: 125000000,
  },
]

const sectorColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Materials: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Consumer: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Consumer Staples": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Financials: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Real Estate": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  Energy: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
}

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

type Holding = typeof holdingsData[0]

export function HoldingsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  
  // Modal states
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [closeModalOpen, setCloseModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)

  const filteredData = holdingsData.filter(
    (holding) =>
      holding.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.sector.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleViewDetails = (holding: Holding) => {
    setSelectedHolding(holding)
    setDetailModalOpen(true)
  }

  const handleEditPosition = (holding: Holding) => {
    setSelectedHolding(holding)
    setEditModalOpen(true)
  }

  const handleClosePosition = (holding: Holding) => {
    setSelectedHolding(holding)
    setCloseModalOpen(true)
  }

  const totalMarketValue = holdingsData.reduce((sum, h) => sum + h.marketValue, 0)
  const totalUnrealizedPnL = holdingsData.reduce((sum, h) => sum + h.unrealizedPnL, 0)
  const totalRealizedPnL = holdingsData.reduce((sum, h) => sum + h.realizedPnL, 0)

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Positions</p>
              <p className="text-2xl font-semibold text-foreground">{holdingsData.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Market Value</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(totalMarketValue)} VND</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Unrealized P&L</p>
              <p className={`text-2xl font-semibold ${totalUnrealizedPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {totalUnrealizedPnL >= 0 ? "+" : ""}{formatCurrency(totalUnrealizedPnL)} VND
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Realized P&L</p>
              <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(totalRealizedPnL)} VND</p>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Portfolio Holdings</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search holdings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-9"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setExportModalOpen(true)}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[120px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 gap-1 text-xs font-medium text-muted-foreground"
                        onClick={() => handleSort("ticker")}
                      >
                        Ticker
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[180px]">Name</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-mr-3 h-8 gap-1 text-xs font-medium text-muted-foreground"
                        onClick={() => handleSort("quantity")}
                      >
                        Quantity
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Avg Cost</TableHead>
                    <TableHead className="text-right">Current Price</TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-mr-3 h-8 gap-1 text-xs font-medium text-muted-foreground"
                        onClick={() => handleSort("marketValue")}
                      >
                        Market Value
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-mr-3 h-8 gap-1 text-xs font-medium text-muted-foreground"
                        onClick={() => handleSort("weight")}
                      >
                        Weight
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-mr-3 h-8 gap-1 text-xs font-medium text-muted-foreground"
                        onClick={() => handleSort("unrealizedPnL")}
                      >
                        Unrealized P&L
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Realized P&L</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((holding) => (
                    <TableRow key={holding.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-semibold text-foreground">{holding.ticker}</TableCell>
                      <TableCell className="text-muted-foreground">{holding.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={sectorColors[holding.sector] || "bg-secondary text-secondary-foreground"}>
                          {holding.sector}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatNumber(holding.quantity)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatNumber(holding.avgCost)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatNumber(holding.currentPrice)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatCurrency(holding.marketValue)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {holding.weight.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {holding.unrealizedPnL >= 0 ? (
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                          )}
                          <span className={holding.unrealizedPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                            {holding.unrealizedPnL >= 0 ? "+" : ""}{formatCurrency(holding.unrealizedPnL)}
                          </span>
                          <span className={`text-xs ${holding.unrealizedPnL >= 0 ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                            ({holding.unrealizedPnLPercent >= 0 ? "+" : ""}{holding.unrealizedPnLPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-emerald-600 dark:text-emerald-400">
                        +{formatCurrency(holding.realizedPnL)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="gap-2"
                              onClick={() => handleViewDetails(holding)}
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2"
                              onClick={() => handleEditPosition(holding)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit Position
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 text-rose-600"
                              onClick={() => handleClosePosition(holding)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Close Position
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Showing {filteredData.length} of {holdingsData.length} holdings
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <HoldingDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        holding={selectedHolding}
      />
      <EditPositionModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        holding={selectedHolding}
        onSave={(data) => {
          console.log("Save position:", data)
        }}
      />
      <ClosePositionModal
        open={closeModalOpen}
        onOpenChange={setCloseModalOpen}
        holding={selectedHolding}
        onClose={(data) => {
          console.log("Close position:", data)
        }}
      />
      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        portfolioName="Tech Growth Fund"
      />
    </>
  )
}
