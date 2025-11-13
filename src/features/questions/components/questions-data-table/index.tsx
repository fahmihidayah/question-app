"use client"

import { DataTable } from "@/components/ui/data-table"
import { useQuery } from "@tanstack/react-query"
import { getQuestions } from "../../actions"
import { columns } from "./columns"

export function QuestionsDataTable() {
  const { 
    data: questionsData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions,
  })

  if (isLoading) {
    return <div>Loading questions...</div>
  }

  if (error) {
    return <div>Error loading questions: {error.message}</div>
  }

  const questions = questionsData?.docs || []

  return (
    <DataTable
      columns={columns}
      data={questions}
      searchKey="question"
      searchPlaceholder="Search questions..."
    />
  )
}