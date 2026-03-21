"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts"

const capitalFlowsData = [
  { month: "Oct", deposits: 150, withdrawals: -30 },
  { month: "Nov", deposits: 200, withdrawals: -80 },
  { month: "Dec", deposits: 100, withdrawals: -150 },
  { month: "Jan", deposits: 250, withdrawals: -50 },
  { month: "Feb", deposits: 180, withdrawals: -20 },
  { month: "Mar", deposits: 300, withdrawals: -100 },
]

export function CapitalFlowsChart() {
  const { resolvedTheme } = useTheme()
  
  const isDark = resolvedTheme === "dark"
  const gridColor = isDark ? "#374151" : "#e2e8f0"
  const tickColor = isDark ? "#9ca3af" : "#64748b"
  const tooltipBg = isDark ? "#1f2937" : "#fff"
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0"
  const tooltipLabelColor = isDark ? "#f9fafb" : "#1e293b"
  const depositColor = isDark ? "#34d399" : "#10b981"
  const withdrawalColor = isDark ? "#fb7185" : "#f43f5e"
  
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Capital Flows
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capitalFlowsData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: tickColor, fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fill: tickColor, fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: tooltipLabelColor, fontWeight: 600 }}
                formatter={(value: number) => [
                  `${Math.abs(value)}M VND`,
                  value >= 0 ? "Deposits" : "Withdrawals",
                ]}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              <Bar dataKey="deposits" name="Deposits" radius={[4, 4, 0, 0]}>
                {capitalFlowsData.map((_, index) => (
                  <Cell key={`deposit-${index}`} fill={depositColor} />
                ))}
              </Bar>
              <Bar dataKey="withdrawals" name="Withdrawals" radius={[4, 4, 0, 0]}>
                {capitalFlowsData.map((_, index) => (
                  <Cell key={`withdrawal-${index}`} fill={withdrawalColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
