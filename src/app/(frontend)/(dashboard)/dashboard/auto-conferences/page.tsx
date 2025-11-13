import { Suspense } from 'react'
import { AutoConferencesDataTable } from '@/features/auto-generated-conferences/components/auto-conferences-data-table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AutoConferencesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Auto-Generated Conferences</h1>
        <Link href={"/dashboard/auto-conferences/create"}>
          <Button>
            Create Auto Conferences
          </Button>
        </Link>
      </div>
     <AutoConferencesDataTable />
    </div>
  )
}