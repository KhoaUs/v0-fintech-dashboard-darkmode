"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  ArrowRight,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ImportStep = "upload" | "mapping" | "preview" | "complete"

const sampleData = [
  { date: "2024-03-15", type: "BUY", ticker: "FPT", quantity: "5000", price: "94500" },
  { date: "2024-03-14", type: "SELL", ticker: "VNM", quantity: "3000", price: "78200" },
  { date: "2024-03-14", type: "BUY", ticker: "TCB", quantity: "10000", price: "35500" },
  { date: "2024-03-13", type: "DIVIDEND", ticker: "VCB", quantity: "100000", price: "1500" },
  { date: "2024-03-12", type: "SELL", ticker: "HPG", quantity: "8000", price: "31500" },
]

const columnOptions = [
  { value: "date", label: "Date" },
  { value: "type", label: "Transaction Type" },
  { value: "ticker", label: "Ticker" },
  { value: "quantity", label: "Quantity" },
  { value: "price", label: "Price" },
  { value: "fees", label: "Fees" },
  { value: "notes", label: "Notes" },
  { value: "ignore", label: "Ignore" },
]

export function ImportModal({ open, onOpenChange }: ImportModalProps) {
  const [step, setStep] = useState<ImportStep>("upload")
  const [importType, setImportType] = useState("transactions")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({
    col1: "date",
    col2: "type",
    col3: "ticker",
    col4: "quantity",
    col5: "price",
  })
  const [importProgress, setImportProgress] = useState(0)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith(".csv") || droppedFile.name.endsWith(".xlsx"))) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleStartImport = () => {
    setStep("complete")
    // Simulate import progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      setImportProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  const handleClose = () => {
    setStep("upload")
    setFile(null)
    setImportProgress(0)
    onOpenChange(false)
  }

  const handleDownloadTemplate = () => {
    // Create sample CSV content
    const csvContent = `Date,Type,Ticker,Quantity,Price,Fees,Notes
2024-03-15,BUY,FPT,5000,94500,47250,Sample buy transaction
2024-03-14,SELL,VNM,3000,78200,23460,Sample sell transaction
2024-03-13,DIVIDEND,VCB,100000,1500,0,Quarterly dividend`
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "portfolio_import_template.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">Import Data</DialogTitle>
          <DialogDescription className="text-slate-500">
            Import transactions, holdings, or cash flows from CSV or Excel files
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="mt-4 flex items-center justify-between">
          {["upload", "mapping", "preview", "complete"].map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step === s
                    ? "bg-slate-900 text-white"
                    : ["upload", "mapping", "preview", "complete"].indexOf(step) > index
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {["upload", "mapping", "preview", "complete"].indexOf(step) > index ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < 3 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 w-16",
                    ["upload", "mapping", "preview", "complete"].indexOf(step) > index
                      ? "bg-emerald-500"
                      : "bg-slate-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>Upload</span>
          <span>Map Columns</span>
          <span>Preview</span>
          <span>Complete</span>
        </div>

        {/* Step Content */}
        <div className="mt-6">
          {step === "upload" && (
            <div className="space-y-4">
              {/* Import Type */}
              <Tabs value={importType} onValueChange={setImportType}>
                <TabsList className="grid w-full grid-cols-3 bg-slate-100">
                  <TabsTrigger value="transactions" className="data-[state=active]:bg-white">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="holdings" className="data-[state=active]:bg-white">
                    Holdings
                  </TabsTrigger>
                  <TabsTrigger value="cashflows" className="data-[state=active]:bg-white">
                    Cash Flows
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* File Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                  isDragging
                    ? "border-slate-400 bg-slate-50"
                    : file
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-300 bg-white hover:border-slate-400"
                )}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                      <FileSpreadsheet className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-sm text-slate-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="text-slate-500"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-slate-500">or click to browse</p>
                    </div>
                    <input
                      type="file"
                      accept=".csv,.xlsx"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-slate-100">
                        <FileSpreadsheet className="mr-1 h-3 w-3" />
                        CSV
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100">
                        <FileText className="mr-1 h-3 w-3" />
                        Excel
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Template */}
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-700">Need a template?</p>
                    <p className="text-sm text-slate-500">
                      Download our sample file to see the expected format
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Template
                </Button>
              </div>
            </div>
          )}

          {step === "mapping" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Map your file columns to the corresponding fields
              </p>

              <div className="space-y-3">
                {Object.entries(columnMappings).map(([col, mapping], index) => (
                  <div key={col} className="flex items-center gap-4">
                    <div className="w-32 rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                      Column {index + 1}
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                    <Select
                      value={mapping}
                      onValueChange={(value) =>
                        setColumnMappings((prev) => ({ ...prev, [col]: value }))
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {columnOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              {/* Preview Sample */}
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-slate-700">Sample Data Preview</p>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="text-xs">Date</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Ticker</TableHead>
                        <TableHead className="text-xs">Quantity</TableHead>
                        <TableHead className="text-xs">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.slice(0, 3).map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-sm">{row.date}</TableCell>
                          <TableCell className="text-sm">{row.type}</TableCell>
                          <TableCell className="text-sm">{row.ticker}</TableCell>
                          <TableCell className="text-sm">{row.quantity}</TableCell>
                          <TableCell className="text-sm">{row.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Review {sampleData.length} transactions before importing
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {sampleData.length} Valid
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-700">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    0 Warnings
                  </Badge>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Ticker</TableHead>
                      <TableHead className="text-xs">Quantity</TableHead>
                      <TableHead className="text-xs">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </TableCell>
                        <TableCell className="text-sm">{row.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              row.type === "BUY"
                                ? "bg-emerald-100 text-emerald-700"
                                : row.type === "SELL"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-blue-100 text-blue-700"
                            )}
                          >
                            {row.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{row.ticker}</TableCell>
                        <TableCell className="text-sm">
                          {parseInt(row.quantity).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm">
                          {parseInt(row.price).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {step === "complete" && (
            <div className="flex flex-col items-center py-6 text-center">
              {importProgress < 100 ? (
                <>
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
                  <p className="font-medium text-slate-700">Importing transactions...</p>
                  <div className="mt-4 w-full max-w-xs">
                    <Progress value={importProgress} className="h-2" />
                    <p className="mt-2 text-sm text-slate-500">{importProgress}% complete</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Import Complete!</h3>
                  <p className="mt-2 text-slate-500">
                    Successfully imported {sampleData.length} transactions
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {sampleData.length} Added
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-600">0 Skipped</Badge>
                    <Badge className="bg-rose-100 text-rose-700">0 Errors</Badge>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          {step === "upload" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep("mapping")}
                disabled={!file}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          {step === "mapping" && (
            <>
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button
                onClick={() => setStep("preview")}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={() => setStep("mapping")}>
                Back
              </Button>
              <Button
                onClick={handleStartImport}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Import {sampleData.length} Transactions
              </Button>
            </>
          )}
          {step === "complete" && importProgress >= 100 && (
            <Button onClick={handleClose} className="bg-slate-900 text-white hover:bg-slate-800">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
