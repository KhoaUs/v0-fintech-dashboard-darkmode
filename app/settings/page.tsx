"use client"

import { currentUser } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock, Bell, Users, Database } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  // Only admins can access this page
  if (currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Access Denied</h1>
          <p className="text-neutral-600 mb-6">Only administrators can access system settings.</p>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const settings = [
    {
      title: 'Organization',
      description: 'Manage organization details, name, and metadata',
      icon: Users,
      href: '#organization',
    },
    {
      title: 'Database',
      description: 'Configure database connections and backups',
      icon: Database,
      href: '#database',
    },
    {
      title: 'Notifications',
      description: 'Email alerts, notifications, and system messages',
      icon: Bell,
      href: '#notifications',
    },
    {
      title: 'Security',
      description: 'API keys, permissions, and access control',
      icon: Lock,
      href: '#security',
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900">System Settings</h1>
          <p className="text-neutral-500 mt-2">Manage system-wide configurations and settings</p>
        </div>
      </div>

      {/* Settings Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.map((setting, idx) => {
            const Icon = setting.icon
            return (
              <a
                key={idx}
                href={setting.href}
                className="group block p-6 rounded-lg border border-neutral-200 bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg p-3 bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {setting.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">{setting.description}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 p-6 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-900">
            <strong>Note:</strong> These settings pages are currently under development. Full configuration
            interface will be available after database integration and Auth.js setup.
          </p>
        </div>
      </main>
    </div>
  )
}
