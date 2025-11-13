"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Conference } from "@/payload-types"
import { SortableHeader } from "@/components/ui/data-table"
import Link from "next/link"
import { ConferenceActions } from "./conference-actions"

export const columns: ColumnDef<Conference>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column}>Title</SortableHeader>
    ),
    cell: ({ row }) => {
      const conference = row.original
      return (
        <div className="font-medium">
          <Link 
            href={`/conferences/${conference.slug}`}
            className="hover:underline text-blue-600"
          >
            {conference.title}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description}
        </div>
      )
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <SortableHeader column={column}>Slug</SortableHeader>
    ),
    cell: ({ row }) => {
      const slug = row.getValue("slug") as string
      return (
        <code className="bg-muted px-2 py-1 rounded text-sm">
          {slug}
        </code>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column}>Created At</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const conference = row.original
      return <ConferenceActions conference={conference} />
    },
  },
]