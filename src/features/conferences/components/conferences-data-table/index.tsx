"use client"

import { DataTable } from "@/components/ui/data-table"
import { useQuery } from "@tanstack/react-query"
import { getConferences } from "../../actions"
import { columns } from "./columns"

export function ConferencesDataTable() {
  const { 
    data: conferencesData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['conferences'],
    queryFn: getConferences,
  })

  if (isLoading) {
    return <div>Loading conferences...</div>
  }

  if (error) {
    return <div>Error loading conferences: {error.message}</div>
  }

  const conferences = conferencesData?.docs || []

  return (
    <DataTable
      columns={columns}
      data={conferences}
      searchKey="title"
      searchPlaceholder="Search conferences..."
    />
  )
}