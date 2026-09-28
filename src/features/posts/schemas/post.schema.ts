import { z } from "zod"

export const postSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const postListSchema = z.array(postSchema)

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "200 characters maximum"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(10_000, "10,000 characters maximum"),
})
