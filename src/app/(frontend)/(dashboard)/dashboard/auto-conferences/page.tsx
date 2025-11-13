import { Suspense } from 'react'
import { AutoConferencesDataTable } from '@/features/auto-generated-conferences/components/auto-conferences-data-table'

export default function AutoConferencesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Auto-Generated Conferences</h1>
      </div>
     <AutoConferencesDataTable />
    </div>
  )
}