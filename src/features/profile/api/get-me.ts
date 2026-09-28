import { userSchema } from "@/features/users/schemas/user.schema"
import { api } from "@/lib/api/client"

export const getMe = (signal?: AbortSignal) =>
  api.get("/users/me", { schema: userSchema, signal })
