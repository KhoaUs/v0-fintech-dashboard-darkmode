"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  Bell,
  Briefcase,
  Calendar,
  Check,
  DollarSign,
  Download,
  Mail,
  Shield,
  Trash2,
  Upload,
} from "lucide-react"
import { ImportModal } from "../modals/import-modal"
import { ExportModal } from "../modals/export-modal"
import { ConfirmDeleteModal } from "../modals/confirm-delete-modal"

const auditLog = [
  { id: 1, action: "Transaction Added", timestamp: "2026-03-15 14:30:22", details: "Buy 5000 FPT @ 94,500" },
  { id: 2, action: "Settings Updated", timestamp: "2026-03-15 10:15:08", details: "Changed benchmark to VNINDEX" },
  { id: 3, action: "Report Exported", timestamp: "2026-03-14 16:45:33", details: "Monthly Performance Report" },
  { id: 4, action: "Portfolio Created", timestamp: "2026-03-10 09:20:11", details: "Created Dividend Income portfolio" },
  { id: 5, action: "Rebalance Executed", timestamp: "2026-03-08 11:05:44", details: "Rebalanced to target allocation" },
]

export function SettingsTab() {
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    tradeAlerts: true,
    riskAlerts: true,
    performanceAlerts: false,
    priceAlerts: true,
  })
  
  // Modal states
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    }, 1000)
  }

  const handleDeletePortfolio = () => {
    console.log("Deleting portfolio...")
    setDeleteModalOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Portfolio Information */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Portfolio Information</CardTitle>
                <CardDescription>Basic details about this portfolio</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolioName">Portfolio Name</Label>
                <Input id="portfolioName" defaultValue="Tech Growth Fund" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolioCode">Portfolio Code</Label>
                <Input id="portfolioCode" defaultValue="TGF-001" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="benchmark">Benchmark</Label>
                <Select defaultValue="vnindex">
                  <SelectTrigger id="benchmark">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vnindex">VNINDEX</SelectItem>
                    <SelectItem value="vn30">VN30</SelectItem>
                    <SelectItem value="hnxindex">HNX-INDEX</SelectItem>
                    <SelectItem value="custom">Custom Benchmark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="currency">Base Currency</Label>
                <Select defaultValue="vnd">
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vnd">VND - Vietnamese Dong</SelectItem>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="inceptionDate">Inception Date</Label>
                <Input id="inceptionDate" type="date" defaultValue="2020-01-15" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="strategy">Investment Strategy</Label>
                <Select defaultValue="growth">
                  <SelectTrigger id="strategy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="income">Income/Dividend</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="A growth-focused portfolio targeting technology and innovation sectors in the Vietnamese market."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button 
                className="gap-2"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fee & Cost Tracking */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Fee & Cost Tracking</CardTitle>
                <CardDescription>Track fees and transaction costs for accurate performance calculation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="brokerFee">Broker Commission Rate</Label>
                <div className="relative">
                  <Input id="brokerFee" defaultValue="0.15" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">Per transaction</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="taxRate">Tax on Sell</Label>
                <div className="relative">
                  <Input id="taxRate" defaultValue="0.1" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">Capital gains tax</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="otherFees">Other Fees</Label>
                <div className="relative">
                  <Input id="otherFees" defaultValue="0" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">Exchange, custody, etc.</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Total Fees YTD</p>
                  <p className="text-sm text-muted-foreground">Based on your transactions this year</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-foreground">12.5M</p>
                  <p className="text-sm text-muted-foreground">VND</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Thresholds */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Risk Thresholds</CardTitle>
                <CardDescription>Set alerts when risk metrics exceed these limits</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxDrawdown">Max Drawdown Limit</Label>
                <div className="relative">
                  <Input id="maxDrawdown" defaultValue="20" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxConcentration">Max Position Size</Label>
                <div className="relative">
                  <Input id="maxConcentration" defaultValue="15" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="minCash">Min Cash Ratio</Label>
                <div className="relative">
                  <Input id="minCash" defaultValue="3" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxSector">Max Sector Exposure</Label>
                <div className="relative">
                  <Input id="maxSector" defaultValue="40" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Configure email and alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Daily Portfolio Summary</p>
                    <p className="text-sm text-muted-foreground">Receive a summary of your portfolio each morning</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailDigest}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailDigest: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Trade Execution Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when your trades are executed</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.tradeAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, tradeAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Risk Threshold Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert when risk metrics exceed your defined thresholds</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.riskAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, riskAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Weekly Performance Reports</p>
                    <p className="text-sm text-muted-foreground">Receive weekly performance summary</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.performanceAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, performanceAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Price Target Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert when stocks hit your price targets</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.priceAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Data Management</CardTitle>
                <CardDescription>Import, export, and manage your portfolio data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Import Transactions</p>
                    <p className="text-xs text-muted-foreground">CSV, Excel supported</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => setImportModalOpen(true)}
                >
                  Import
                </Button>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Export Portfolio</p>
                    <p className="text-xs text-muted-foreground">All data and transactions</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => setExportModalOpen(true)}
                >
                  Export
                </Button>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-900/20 p-4">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  <div>
                    <p className="font-medium text-rose-700 dark:text-rose-400">Delete Portfolio</p>
                    <p className="text-xs text-rose-500 dark:text-rose-400/70">This cannot be undone</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full border-rose-200 text-rose-600 hover:bg-rose-100 dark:border-rose-900/50 dark:text-rose-400 dark:hover:bg-rose-900/30"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Activity Log</CardTitle>
                <CardDescription>Recent activity and changes in this portfolio</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-medium text-muted-foreground">Action</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">Details</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLog.map((log) => (
                  <TableRow key={log.id} className="border-border hover:bg-muted/50">
                    <TableCell>
                      <Badge variant="secondary">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{log.details}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
      />
      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        portfolioName="Tech Growth Fund"
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Portfolio"
        description="Are you sure you want to delete this portfolio? All transactions, holdings, and historical data will be permanently removed. This action cannot be undone."
        itemName="Tech Growth Fund (TGF-001)"
        onConfirm={handleDeletePortfolio}
      />
    </>
  )
}
