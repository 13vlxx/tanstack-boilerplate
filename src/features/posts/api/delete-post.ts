import { api } from "@/lib/api/client"

export const deletePost = (id: string) =>
  api.delete(`/posts/${encodeURIComponent(id)}`)
