import { userListSchema } from "@/features/users/schemas/user.schema"
import type { UserFilters } from "@/features/users/types/user.types"
import { api } from "@/lib/api/client"

export const USERS_PAGE_SIZE = 20

export const getUsers = ({ page }: UserFilters, signal?: AbortSignal) =>
  api.get("/users", {
    schema: userListSchema,
    query: { page, pageSize: USERS_PAGE_SIZE },
    signal,
  })
