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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { AddTransactionModal } from "../modals/add-transaction-modal"
import { ConfirmDeleteModal } from "../modals/confirm-delete-modal"
import { ExportModal } from "../modals/export-modal"

const transactionsData = [
  {
    id: "TXN001",
    date: "2024-03-15",
    type: "BUY",
    ticker: "FPT",
    name: "FPT Corporation",
    quantity: 5000,
    price: 94500,
    totalValue: 472500000,
    fees: 472500,
    status: "Completed",
  },
  {
    id: "TXN002",
    date: "2024-03-14",
    type: "SELL",
    ticker: "VNM",
    name: "Vinamilk",
    quantity: 3000,
    price: 78200,
    totalValue: 234600000,
    fees: 234600,
    status: "Completed",
  },
  {
    id: "TXN003",
    date: "2024-03-14",
    type: "BUY",
    ticker: "TCB",
    name: "Techcombank",
    quantity: 10000,
    price: 35500,
    totalValue: 355000000,
    fees: 355000,
    status: "Completed",
  },
  {
    id: "TXN004",
    date: "2024-03-13",
    type: "DIVIDEND",
    ticker: "VCB",
    name: "Vietcombank",
    quantity: 100000,
    price: 1500,
    totalValue: 150000000,
    fees: 0,
    status: "Completed",
  },
  {
    id: "TXN005",
    date: "2024-03-12",
    type: "SELL",
    ticker: "HPG",
    name: "Hoa Phat Group",
    quantity: 8000,
    price: 31500,
    totalValue: 252000000,
    fees: 252000,
    status: "Completed",
  },
  {
    id: "TXN006",
    date: "2024-03-11",
    type: "BUY",
    ticker: "MSN",
    name: "Masan Group",
    quantity: 4000,
    price: 88900,
    totalValue: 355600000,
    fees: 355600,
    status: "Completed",
  },
  {
    id: "TXN007",
    date: "2024-03-10",
    type: "SELL",
    ticker: "VHM",
    name: "Vinhomes",
    quantity: 5000,
    price: 53200,
    totalValue: 266000000,
    fees: 266000,
    status: "Completed",
  },
  {
    id: "TXN008",
    date: "2024-03-08",
    type: "BUY",
    ticker: "GAS",
    name: "PV Gas",
    quantity: 2000,
    price: 101500,
    totalValue: 203000000,
    fees: 203000,
    status: "Pending",
  },
  {
    id: "TXN009",
    date: "2024-03-07",
    type: "DIVIDEND",
    ticker: "FPT",
    name: "FPT Corporation",
    quantity: 150000,
    price: 2000,
    totalValue: 300000000,
    fees: 0,
    status: "Completed",
  },
  {
    id: "TXN010",
    date: "2024-03-06",
    type: "BUY",
    ticker: "PLX",
    name: "Petrolimex",
    quantity: 6000,
    price: 40800,
    totalValue: 244800000,
    fees: 244800,
    status: "Completed",
  },
]

const typeColors: Record<string, string> = {
  BUY: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  SELL: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  DIVIDEND: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Failed: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
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

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

type Transaction = typeof transactionsData[0]

export function TransactionsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Modal states
  const [addTransactionOpen, setAddTransactionOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredData = transactionsData.filter((tx) => {
    const matchesSearch =
      tx.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleDeleteTransaction = (tx: Transaction) => {
    setSelectedTransaction(tx)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    console.log("Deleting transaction:", selectedTransaction?.id)
    setDeleteModalOpen(false)
    setSelectedTransaction(null)
  }

  const totalBuy = transactionsData
    .filter((tx) => tx.type === "BUY")
    .reduce((sum, tx) => sum + tx.totalValue, 0)
  const totalSell = transactionsData
    .filter((tx) => tx.type === "SELL")
    .reduce((sum, tx) => sum + tx.totalValue, 0)
  const totalDividends = transactionsData
    .filter((tx) => tx.type === "DIVIDEND")
    .reduce((sum, tx) => sum + tx.totalValue, 0)
  const totalFees = transactionsData.reduce((sum, tx) => sum + tx.fees, 0)

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bought</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(totalBuy)} VND</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                  <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sold</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(totalSell)} VND</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dividends Received</p>
                  <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(totalDividends)} VND</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(totalFees)} VND</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Transaction History</CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 pl-9"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="BUY">Buy</SelectItem>
                    <SelectItem value="SELL">Sell</SelectItem>
                    <SelectItem value="DIVIDEND">Dividend</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setExportModalOpen(true)}
                >
                  <Download className="h-4 w-4" />
                  Export
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
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[100px] text-xs font-medium text-muted-foreground">Transaction ID</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Date</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Type</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Ticker</TableHead>
                    <TableHead className="min-w-[150px] text-xs font-medium text-muted-foreground">Name</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Quantity</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Price</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Total Value</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Fees</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((tx) => (
                    <TableRow key={tx.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-mono text-sm text-muted-foreground">{tx.id}</TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(tx.date)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={typeColors[tx.type]}>
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">{tx.ticker}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.name}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatNumber(tx.quantity)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatNumber(tx.price)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatCurrency(tx.totalValue)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {tx.fees > 0 ? formatCurrency(tx.fees) : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[tx.status]}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 text-rose-600"
                              onClick={() => handleDeleteTransaction(tx)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
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
                Showing {filteredData.length} of {transactionsData.length} transactions
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
      <AddTransactionModal
        open={addTransactionOpen}
        onOpenChange={setAddTransactionOpen}
      />
      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        portfolioName="Tech Growth Fund"
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone and will affect your portfolio calculations."
        itemName={selectedTransaction ? `${selectedTransaction.type} ${selectedTransaction.ticker} - ${formatDate(selectedTransaction.date)}` : undefined}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
