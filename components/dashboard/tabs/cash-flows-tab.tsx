"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  Wallet,
  TrendingUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { AddCashFlowModal } from "../modals/add-cash-flow-modal"
import { ConfirmDeleteModal } from "../modals/confirm-delete-modal"
import { ExportModal } from "../modals/export-modal"

const cashFlowsData = [
  { id: "CF001", date: "2024-03-15", type: "DEPOSIT", description: "Monthly contribution", amount: 500000000, status: "Completed" },
  { id: "CF002", date: "2024-03-01", type: "DEPOSIT", description: "Quarterly bonus allocation", amount: 250000000, status: "Completed" },
  { id: "CF003", date: "2024-02-28", type: "WITHDRAWAL", description: "Client withdrawal request", amount: 150000000, status: "Completed" },
  { id: "CF004", date: "2024-02-15", type: "DEPOSIT", description: "Monthly contribution", amount: 500000000, status: "Completed" },
  { id: "CF005", date: "2024-02-01", type: "FEE", description: "Management fee (Q4 2023)", amount: 75000000, status: "Completed" },
  { id: "CF006", date: "2024-01-31", type: "WITHDRAWAL", description: "Partial redemption", amount: 200000000, status: "Completed" },
  { id: "CF007", date: "2024-01-15", type: "DEPOSIT", description: "Monthly contribution", amount: 500000000, status: "Completed" },
  { id: "CF008", date: "2024-01-05", type: "DEPOSIT", description: "New investor subscription", amount: 1000000000, status: "Completed" },
  { id: "CF009", date: "2023-12-29", type: "FEE", description: "Performance fee (2023)", amount: 120000000, status: "Completed" },
  { id: "CF010", date: "2023-12-15", type: "DEPOSIT", description: "Monthly contribution", amount: 500000000, status: "Completed" },
]

const monthlyChartData = [
  { month: "Oct", deposits: 650, withdrawals: 100, netFlow: 550 },
  { month: "Nov", deposits: 580, withdrawals: 180, netFlow: 400 },
  { month: "Dec", deposits: 620, withdrawals: 120, netFlow: 500 },
  { month: "Jan", deposits: 1500, withdrawals: 200, netFlow: 1300 },
  { month: "Feb", deposits: 500, withdrawals: 225, netFlow: 275 },
  { month: "Mar", deposits: 750, withdrawals: 0, netFlow: 750 },
]

const cumulativeData = [
  { month: "Oct", cumulative: 12500 },
  { month: "Nov", cumulative: 12900 },
  { month: "Dec", cumulative: 13400 },
  { month: "Jan", cumulative: 14700 },
  { month: "Feb", cumulative: 14975 },
  { month: "Mar", cumulative: 15725 },
]

const typeColors: Record<string, string> = {
  DEPOSIT: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  WITHDRAWAL: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  FEE: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
}

const typeIcons: Record<string, React.ReactNode> = {
  DEPOSIT: <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
  WITHDRAWAL: <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
  FEE: <ArrowDownRight className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
}

function formatCurrency(value: number) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`
  }
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

type CashFlow = typeof cashFlowsData[0]

export function CashFlowsTab() {
  const [typeFilter, setTypeFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("6m")
  const { resolvedTheme } = useTheme()
  
  const isDark = resolvedTheme === "dark"
  const gridColor = isDark ? "#374151" : "#e2e8f0"
  const tickColor = isDark ? "#9ca3af" : "#64748b"
  const tooltipBg = isDark ? "#1f2937" : "white"
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0"
  const depositColor = isDark ? "#34d399" : "#10b981"
  const withdrawalColor = isDark ? "#fb7185" : "#f43f5e"
  const lineColor = isDark ? "#f9fafb" : "#0f172a"

  // Modal states
  const [addCashFlowOpen, setAddCashFlowOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCashFlow, setSelectedCashFlow] = useState<CashFlow | null>(null)

  const filteredData = cashFlowsData.filter((cf) => {
    return typeFilter === "all" || cf.type === typeFilter
  })

  const handleDeleteCashFlow = (cf: CashFlow) => {
    setSelectedCashFlow(cf)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    console.log("Deleting cash flow:", selectedCashFlow?.id)
    setDeleteModalOpen(false)
    setSelectedCashFlow(null)
  }

  const totalDeposits = cashFlowsData
    .filter((cf) => cf.type === "DEPOSIT")
    .reduce((sum, cf) => sum + cf.amount, 0)
  const totalWithdrawals = cashFlowsData
    .filter((cf) => cf.type === "WITHDRAWAL")
    .reduce((sum, cf) => sum + cf.amount, 0)
  const totalFees = cashFlowsData
    .filter((cf) => cf.type === "FEE")
    .reduce((sum, cf) => sum + cf.amount, 0)
  const netCashFlow = totalDeposits - totalWithdrawals - totalFees

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Deposits</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(totalDeposits)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                  <ArrowDownRight className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                  <p className="text-xl font-semibold text-rose-600 dark:text-rose-400">-{formatCurrency(totalWithdrawals)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Wallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-xl font-semibold text-amber-600 dark:text-amber-400">-{formatCurrency(totalFees)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Cash Flow</p>
                  <p className={`text-xl font-semibold ${netCashFlow >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {netCashFlow >= 0 ? "+" : ""}{formatCurrency(netCashFlow)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Monthly Cash Flows Chart */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground">Monthly Cash Flows</CardTitle>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-24 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">3M</SelectItem>
                    <SelectItem value="6m">6M</SelectItem>
                    <SelectItem value="1y">1Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyChartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} tickFormatter={(value) => `${value}M`} />
                    <Tooltip
                      formatter={(value: number) => [`${value}M VND`, ""]}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        border: `1px solid ${tooltipBorder}`,
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar dataKey="deposits" name="Deposits" fill={depositColor} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="withdrawals" name="Withdrawals" fill={withdrawalColor} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cumulative AUM Chart */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Cumulative AUM Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cumulativeData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickColor }} tickFormatter={(value) => `${(value / 1000).toFixed(1)}B`} domain={["dataMin - 500", "dataMax + 500"]} />
                    <Tooltip
                      formatter={(value: number) => [`${(value / 1000).toFixed(2)}B VND`, "AUM"]}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        border: `1px solid ${tooltipBorder}`,
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      name="AUM"
                      stroke={lineColor}
                      strokeWidth={2}
                      dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: lineColor }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flows Table */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Cash Flow History</CardTitle>
              <div className="flex items-center gap-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="DEPOSIT">Deposits</SelectItem>
                    <SelectItem value="WITHDRAWAL">Withdrawals</SelectItem>
                    <SelectItem value="FEE">Fees</SelectItem>
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
                  onClick={() => setAddCashFlowOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Cash Flow
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[100px] text-xs font-medium text-muted-foreground">ID</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Date</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Type</TableHead>
                    <TableHead className="min-w-[200px] text-xs font-medium text-muted-foreground">Description</TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((cf) => (
                    <TableRow key={cf.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-mono text-sm text-muted-foreground">{cf.id}</TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(cf.date)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {typeIcons[cf.type]}
                          <Badge variant="secondary" className={typeColors[cf.type]}>
                            {cf.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{cf.description}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${cf.type === "DEPOSIT" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {cf.type === "DEPOSIT" ? "+" : "-"}{formatCurrency(cf.amount)} VND
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          {cf.status}
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
                              onClick={() => handleDeleteCashFlow(cf)}
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
                Showing {filteredData.length} of {cashFlowsData.length} records
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
      <AddCashFlowModal
        open={addCashFlowOpen}
        onOpenChange={setAddCashFlowOpen}
        onAdd={(data) => {
          console.log("Adding cash flow:", data)
        }}
      />
      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        portfolioName="Tech Growth Fund"
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Cash Flow"
        description="Are you sure you want to delete this cash flow record? This will affect your portfolio's cash balance calculations."
        itemName={selectedCashFlow ? `${selectedCashFlow.type} - ${formatDate(selectedCashFlow.date)}` : undefined}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
