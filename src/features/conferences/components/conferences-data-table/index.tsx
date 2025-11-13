"use client"

import { DataTable } from "@/components/ui/data-table"
import { useQuery } from "@tanstack/react-query"
import { getConferences } from "../../actions"
import { columns } from "./columns"
import { useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export function ConferencesDataTable() {
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const debouncedKeyword = useDebounce(keyword, 300)

  const {
    data: conferencesData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['conferences', debouncedKeyword, page],
    queryFn: async () => {
      return await getConferences({
        keyword: debouncedKeyword,
        page
      })
    },
  })

  const conferences = conferencesData?.docs || []
  const totalPages = conferencesData?.totalPages || 1
  const hasNextPage = conferencesData?.hasNextPage || false
  const hasPrevPage = conferencesData?.hasPrevPage || false

  return (
    <DataTable
      columns={columns()}
      data={conferences}
      searchKey="title"
      searchPlaceholder="Search conferences..."
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