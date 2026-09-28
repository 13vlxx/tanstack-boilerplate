import { postSchema } from "@/features/posts/schemas/post.schema"
import { api } from "@/lib/api/client"

export const getPost = (id: string, signal?: AbortSignal) =>
  api.get(`/posts/${encodeURIComponent(id)}`, { schema: postSchema, signal })
