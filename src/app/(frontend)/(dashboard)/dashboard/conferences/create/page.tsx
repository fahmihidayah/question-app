import { Suspense } from 'react'
import { ConferencesDataTable } from '@/features/conferences/components/conferences-data-table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConferenceForm from '@/features/conferences/components/form'

export default function ConferencesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Conferences</h1>
        
      </div>
     <ConferenceForm />
    </div>
  )
}