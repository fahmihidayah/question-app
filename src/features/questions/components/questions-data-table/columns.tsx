"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Question } from "@/payload-types"
import { SortableHeader } from "@/components/ui/data-table"
import Link from "next/link"
import { QuestionActions } from "./question-actions"

export const columns = ({
  isTableQuestion
}: {
  isTableQuestion: boolean
}): ColumnDef<Question>[] => {
  return [
    {
      accessorKey: "question",
      header: ({ column }) => (
        <SortableHeader column={column}>Question</SortableHeader>
      ),
      cell: ({ row }) => {
        const question = row.getValue("question") as string
        return (
          <div className="max-w-[400px] font-medium">
            <div className="truncate" title={question}>
              {question}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableHeader column={column}>Asked By</SortableHeader>
      ),
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return (
          <div className="font-medium">
            {name}
          </div>
        )
      },
    },
    {
      id: "conference",
      header: "Conference",
      cell: ({ row }) => {
        const question = row.original

        if (question.conference && typeof question.conference === 'object') {
          return (
            <Link
              href={`/conferences/${question.conference.slug}`}
              className="hover:underline text-blue-600"
            >
              {question.conference.title}
            </Link>
          )
        }


        return <span className="text-muted-foreground">No conference</span>
      },
    },
    ... ((isTableQuestion) ? []
      : [{
      id: "conferenceType",
      header: "Pusblish",
      cell: ({ row }) => {
        const question = row.original
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {
              question.accept ? "Published" : "Pending"
            }
          </span>
        )
      },
    },]) as ColumnDef<Question>[],
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
        const question = row.original
        return <QuestionActions question={question} isTableQuestion={isTableQuestion} />
      },
    },
  ]
}