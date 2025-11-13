"use client"

import { Conference } from "@/payload-types"
import { ActionMenu } from "@/components/ui/data-table"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Eye, Copy, Share2 } from "lucide-react"
import { useState } from "react"
import { deleteConferenceById } from "../../actions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"

interface ConferenceActionsProps {
  conference: Conference
}

export function ConferenceActions({ conference }: ConferenceActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this conference?")) {
      setIsDeleting(true)
      try {
        await deleteConferenceById(conference.id)
        queryClient.invalidateQueries({ queryKey: ['conferences'] })
        router.refresh()
      } catch (error) {
        console.error("Failed to delete conference:", error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleCopy = async () => {
    const url = `${window.location.origin}/conferences/${conference.slug}/question`
    try {
      await navigator.clipboard.writeText(url)
      alert("Conference link copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/conferences/${conference.slug}/question`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: conference.title,
          url: url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <ActionMenu>
      <DropdownMenuItem asChild>
        <Link href={`/conferences/${conference.slug}`}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/conferences/${conference.id}/edit`}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleCopy}>
        <Copy className="mr-2 h-4 w-4" />
        Copy Link
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 focus:text-red-600"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isDeleting ? "Deleting..." : "Delete"}
      </DropdownMenuItem>
    </ActionMenu>
  )
}