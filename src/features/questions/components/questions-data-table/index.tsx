"use client"

import { DataTable } from "@/components/ui/data-table"
import { useQuery } from "@tanstack/react-query"
import { getQuestions } from "../../actions"
import { columns } from "./columns"
import { useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export function QuestionsDataTable({conferenceId} : {conferenceId? : string}) {
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const debouncedKeyword = useDebounce(keyword, 300)

  const {
    data: questionsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['questions', debouncedKeyword, page],
    queryFn: async () => {
      return await getQuestions({
        keyword: debouncedKeyword,
        page,
        conferenceId
      })
    },
  })

  const questions = questionsData?.docs || []
  const totalPages = questionsData?.totalPages || 1
  const hasNextPage = questionsData?.hasNextPage || false
  const hasPrevPage = questionsData?.hasPrevPage || false

  return (
    <DataTable
      columns={columns}
      data={questions}
      searchKey="question"
      searchPlaceholder="Search questions..."
      isLoading={isLoading}
      error={error?.message}
      onChange={(value) => {
        setKeyword(value)
        setPage(1) // Reset to first page when searching
      }}
      value={keyword}
      page={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      onPageChange={(newPage) => setPage(newPage)}
    />
  )
}