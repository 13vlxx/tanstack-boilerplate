import { userSchema } from "@/features/users/schemas/user.schema"
import { api } from "@/lib/api/client"

export const removeProfilePicture = () =>
  api.delete("/users/me/profile-picture", { schema: userSchema })
