"use client"

import { Conference, Question } from "@/payload-types"
import { ActionMenu } from "@/components/ui/data-table"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Eye, Copy, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { deleteQuestion, updateQuestionStatus } from "../../actions"
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
  question: Question,
  isTableQuestion : boolean
}

export function QuestionActions({ question, isTableQuestion }: QuestionActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null)
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

  const handleStatusClick = (newStatus: boolean) => {
    setPendingStatus(newStatus)
    setShowStatusDialog(true)
  }

  const handleStatusConfirm = async () => {
    if (pendingStatus === null) return

    setIsUpdatingStatus(true)
    setShowStatusDialog(false)
    try {
      const result = await updateQuestionStatus(question.id, pendingStatus)
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['questions'] })
        router.refresh()
      } else {
        console.error("Failed to update question status:", result.error)
        alert("Failed to update question status. Please try again.")
      }
    } catch (error) {
      console.error("Failed to update question status:", error)
      alert("Failed to update question status. Please try again.")
    } finally {
      setIsUpdatingStatus(false)
      setPendingStatus(null)
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

        {/* Show publish/pending options only if isTableQuestion is false */}
        {!isTableQuestion && (
          <>
            {question.accept ? (
              <DropdownMenuItem
                onClick={() => handleStatusClick(false)}
                disabled={isUpdatingStatus}
                className="text-orange-600 focus:text-orange-600"
              >
                <Clock className="mr-2 h-4 w-4" />
                {isUpdatingStatus ? "Updating..." : "Set to Pending"}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => handleStatusClick(true)}
                disabled={isUpdatingStatus}
                className="text-green-600 focus:text-green-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {isUpdatingStatus ? "Updating..." : "Publish Question"}
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuItem
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </ActionMenu>

      {/* Delete Confirmation Dialog */}
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

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingStatus ? "Publish Question" : "Set Question to Pending"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingStatus
                ? "Are you sure you want to publish this question? It will be visible to the audience."
                : "Are you sure you want to set this question to pending? It will be hidden from the audience."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingStatus(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusConfirm}
              className={pendingStatus
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-600"
                : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-600"}
            >
              {pendingStatus ? "Publish" : "Set to Pending"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}