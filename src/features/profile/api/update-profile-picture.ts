import { userSchema } from "@/features/users/schemas/user.schema"
import { api } from "@/lib/api/client"

export const updateProfilePicture = (file: File) => {
  const body = new FormData()
  body.append("file", file)
  return api.put("/users/me/profile-picture", { schema: userSchema, body })
}
