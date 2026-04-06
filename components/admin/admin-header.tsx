"use client"

import { Button } from '@/components/ui/button'
import { Plus, Download, Settings } from 'lucide-react'

export function AdminHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              System Administration
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Manage organizations, users, teams, and system configuration
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-muted"
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-muted"
            >
              <Settings className="w-4 h-4" />
              Configuration
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <Plus className="w-4 h-4" />
              New Organization
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
