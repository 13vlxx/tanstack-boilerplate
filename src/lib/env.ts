import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_LOGTO_ENDPOINT: z.url(),
  VITE_LOGTO_APP_ID: z.string().min(1),
  VITE_LOGTO_API_RESOURCE: z.string().min(1),
})

const result = envSchema.safeParse(import.meta.env)
if (!result.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(result.error)}`
  )
}

export const env = result.data
