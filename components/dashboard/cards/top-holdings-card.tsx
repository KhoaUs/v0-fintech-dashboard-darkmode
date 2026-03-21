"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrendingUp, TrendingDown } from "lucide-react"

const holdingsData = [
  { symbol: "FPT", weight: 15.2, pnl: 125000000, pnlPercent: 32.5 },
  { symbol: "HPG", weight: 12.8, pnl: -45000000, pnlPercent: -8.2 },
  { symbol: "MWG", weight: 10.5, pnl: 78000000, pnlPercent: 18.7 },
]

export function TopHoldingsCard() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Top Holdings Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="h-9 px-2 text-xs font-medium text-muted-foreground">
                Symbol
              </TableHead>
              <TableHead className="h-9 px-2 text-right text-xs font-medium text-muted-foreground">
                Weight
              </TableHead>
              <TableHead className="h-9 px-2 text-right text-xs font-medium text-muted-foreground">
                Unrealized PnL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdingsData.map((holding) => (
              <TableRow key={holding.symbol} className="border-border">
                <TableCell className="px-2 py-3 font-medium text-foreground">
                  {holding.symbol}
                </TableCell>
                <TableCell className="px-2 py-3 text-right text-muted-foreground">
                  {holding.weight}%
                </TableCell>
                <TableCell className="px-2 py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {holding.pnl >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                    )}
                    <span
                      className={
                        holding.pnl >= 0 ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
                      }
                    >
                      {holding.pnlPercent >= 0 ? "+" : ""}
                      {holding.pnlPercent}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
