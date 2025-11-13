import { Suspense } from 'react'
import { QuestionsDataTable } from '@/features/questions/components/questions-data-table'

export default function QuestionsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Questions</h1>
      </div>
       <QuestionsDataTable />
    </div>
  )
}