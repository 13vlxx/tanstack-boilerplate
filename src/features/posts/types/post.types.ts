import type { z } from "zod"
import type {
  createPostSchema,
  postSchema,
} from "@/features/posts/schemas/post.schema"
import type { Pagination } from "@/types/pagination.types"

export type Post = z.infer<typeof postSchema>

export type CreatePostInput = z.output<typeof createPostSchema>

export type PostFilters = Pick<Pagination, "page"> & {
  authorId?: string
}
