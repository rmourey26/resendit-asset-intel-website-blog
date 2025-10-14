"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteBlogPost } from "@/lib/actions/blog"

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    setLoading(true)
    const result = await deleteBlogPost(postId)

    if (result.error) {
      alert(result.error)
      setLoading(false)
      return
    }

    router.refresh()
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
