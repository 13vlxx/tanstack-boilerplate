import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  /** Presigned URL, valid 15 minutes. */
  profilePictureUrl: z.string().nullable(),
})

export const userListSchema = z.array(userSchema)
