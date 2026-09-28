import { postSchema } from "@/features/posts/schemas/post.schema"
import type { CreatePostInput } from "@/features/posts/types/post.types"
import { api } from "@/lib/api/client"

export const createPost = (input: CreatePostInput) =>
  api.post("/posts", { schema: postSchema, body: input })
