"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/overview-tab"
import { HoldingsTab } from "./tabs/holdings-tab"
import { TransactionsTab } from "./tabs/transactions-tab"
import { CashFlowsTab } from "./tabs/cash-flows-tab"
import { PerformanceTab } from "./tabs/performance-tab"
import { AllocationTab } from "./tabs/allocation-tab"
import { SettingsTab } from "./tabs/settings-tab"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6 w-full justify-start overflow-x-auto border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="holdings"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Holdings
        </TabsTrigger>
        <TabsTrigger
          value="transactions"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Transactions
        </TabsTrigger>
        <TabsTrigger
          value="cash-flows"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Cash Flows
        </TabsTrigger>
        <TabsTrigger
          value="performance"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Performance
        </TabsTrigger>
        <TabsTrigger
          value="allocation"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Allocation
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-0">
        <OverviewTab />
      </TabsContent>
      <TabsContent value="holdings" className="mt-0">
        <HoldingsTab />
      </TabsContent>
      <TabsContent value="transactions" className="mt-0">
        <TransactionsTab />
      </TabsContent>
      <TabsContent value="cash-flows" className="mt-0">
        <CashFlowsTab />
      </TabsContent>
      <TabsContent value="performance" className="mt-0">
        <PerformanceTab />
      </TabsContent>
      <TabsContent value="allocation" className="mt-0">
        <AllocationTab />
      </TabsContent>
      <TabsContent value="settings" className="mt-0">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  )
}
