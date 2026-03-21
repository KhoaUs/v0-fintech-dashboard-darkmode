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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Download,
  FileSpreadsheet,
  FileText,
  CalendarIcon,
  CheckCircle2,
} from "lucide-react"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  portfolioName: string
}

export function ExportModal({ open, onOpenChange, portfolioName }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportType, setExportType] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  })
  const [includeOptions, setIncludeOptions] = useState({
    holdings: true,
    transactions: true,
    cashFlows: true,
    performance: true,
    allocation: false,
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    // Simulate export
    setTimeout(() => {
      setIsExporting(false)
      setExportComplete(true)
      // Auto download
      const blob = new Blob(["Sample export data"], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${portfolioName.replace(/\s+/g, "_")}_export.${exportFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 1500)
  }

  const handleClose = () => {
    setExportComplete(false)
    setIsExporting(false)
    onOpenChange(false)
  }

  const selectedCount = Object.values(includeOptions).filter(Boolean).length

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Download className="h-5 w-5" />
            Export Portfolio
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Download your portfolio data for {portfolioName}
          </DialogDescription>
        </DialogHeader>

        {exportComplete ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Export Complete!</h3>
            <p className="mt-2 text-muted-foreground">
              Your file has been downloaded successfully.
            </p>
            <Button onClick={handleClose} className="mt-6">
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-4 space-y-6">
              {/* Export Format */}
              <div className="space-y-3">
                <Label>Export Format</Label>
                <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="grid grid-cols-3 gap-3">
                  <div className={cn(
                    "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors",
                    exportFormat === "csv"
                      ? "border-primary bg-muted"
                      : "border-border hover:border-muted-foreground"
                  )}>
                    <FileSpreadsheet className={cn("h-6 w-6", exportFormat === "csv" ? "text-foreground" : "text-muted-foreground")} />
                    <RadioGroupItem value="csv" id="csv" className="sr-only" />
                    <Label htmlFor="csv" className="cursor-pointer text-sm font-medium">CSV</Label>
                  </div>
                  <div className={cn(
                    "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors",
                    exportFormat === "xlsx"
                      ? "border-primary bg-muted"
                      : "border-border hover:border-muted-foreground"
                  )}>
                    <FileSpreadsheet className={cn("h-6 w-6", exportFormat === "xlsx" ? "text-foreground" : "text-muted-foreground")} />
                    <RadioGroupItem value="xlsx" id="xlsx" className="sr-only" />
                    <Label htmlFor="xlsx" className="cursor-pointer text-sm font-medium">Excel</Label>
                  </div>
                  <div className={cn(
                    "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors",
                    exportFormat === "pdf"
                      ? "border-primary bg-muted"
                      : "border-border hover:border-muted-foreground"
                  )}>
                    <FileText className={cn("h-6 w-6", exportFormat === "pdf" ? "text-foreground" : "text-muted-foreground")} />
                    <RadioGroupItem value="pdf" id="pdf" className="sr-only" />
                    <Label htmlFor="pdf" className="cursor-pointer text-sm font-medium">PDF</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <Label>Date Range</Label>
                <RadioGroup value={exportType} onValueChange={setExportType} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="cursor-pointer">All time</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="ytd" id="ytd" />
                    <Label htmlFor="ytd" className="cursor-pointer">Year to date</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="cursor-pointer">Custom range</Label>
                  </div>
                </RadioGroup>

                {exportType === "custom" && (
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(d) => setDateRange((prev) => ({ ...prev, from: d }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(d) => setDateRange((prev) => ({ ...prev, to: d }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Include Options */}
              <div className="space-y-3">
                <Label>Include in Export ({selectedCount} selected)</Label>
                <div className="space-y-2">
                  {[
                    { key: "holdings", label: "Current Holdings" },
                    { key: "transactions", label: "Transaction History" },
                    { key: "cashFlows", label: "Cash Flows" },
                    { key: "performance", label: "Performance Metrics" },
                    { key: "allocation", label: "Allocation Report" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <Checkbox
                        id={key}
                        checked={includeOptions[key as keyof typeof includeOptions]}
                        onCheckedChange={(checked) =>
                          setIncludeOptions((prev) => ({ ...prev, [key]: checked === true }))
                        }
                      />
                      <Label htmlFor={key} className="cursor-pointer text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleExport}
                disabled={isExporting || selectedCount === 0}
                className="gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
