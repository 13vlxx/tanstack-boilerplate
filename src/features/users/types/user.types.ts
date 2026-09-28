import type { z } from "zod"
import type { userSchema } from "@/features/users/schemas/user.schema"
import type { Pagination } from "@/types/pagination.types"

export type User = z.infer<typeof userSchema>

export type UserFilters = Pick<Pagination, "page">
