"use client"

import { Conference, Question } from "@/payload-types"
import { ActionMenu } from "@/components/ui/data-table"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Eye, Copy } from "lucide-react"
import { useState } from "react"
import { deleteQuestion } from "../../actions"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface QuestionActionsProps {
  question: Question
}

export function QuestionActions({ question }: QuestionActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    setShowDeleteDialog(false)
    try {
      const result = await deleteQuestion(question.id)
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['questions'] })
        router.refresh()
      } else {
        console.error("Failed to delete question:", result.error)
        alert("Failed to delete question. Please try again.")
      }
    } catch (error) {
      console.error("Failed to delete question:", error)
      alert("Failed to delete question. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.question)
      alert("Question text copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getConferenceUrl = () => {
    if (question.conference && typeof question.conference === 'object') {
      return `/conferences/${question.conference.slug}`
    }
    if (question.conference && typeof question.conference === 'object') {
      return `/auto-conferences/${(question.conference as Conference)?.slug}`
    }
    return "#"
  }

  return (
    <>
      <ActionMenu>
        <DropdownMenuItem asChild>
          <a href={getConferenceUrl()}>
            <Eye className="mr-2 h-4 w-4" />
            View Conference
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Question
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </ActionMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}