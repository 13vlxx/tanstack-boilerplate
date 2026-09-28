import { postListSchema } from "@/features/posts/schemas/post.schema"
import type { PostFilters } from "@/features/posts/types/post.types"
import { api } from "@/lib/api/client"

export const POSTS_PAGE_SIZE = 10

export const getPosts = (
  { page, authorId }: PostFilters,
  signal?: AbortSignal
) =>
  api.get("/posts", {
    schema: postListSchema,
    query: { page, pageSize: POSTS_PAGE_SIZE, authorId },
    signal,
  })
