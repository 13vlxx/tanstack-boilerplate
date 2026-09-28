import { z } from "zod"

export const pageSearchSchema = z.object({
  page: z.number().int().min(1).default(1).catch(1),
})

export type PageSearch = z.infer<typeof pageSearchSchema>

// The API returns plain arrays: a full page means there may be another one.
export const hasNextPage = (items: unknown[], pageSize: number): boolean =>
  items.length === pageSize
