import { Suspense } from 'react'
import { ConferencesDataTable } from '@/features/conferences/components/conferences-data-table'

export default function ConferencesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Conferences</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ConferencesDataTable />
      </Suspense>
    </div>
  )
}