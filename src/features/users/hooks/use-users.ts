import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { getUsers } from "@/features/users/api/get-users"
import { userKeys } from "@/features/users/api/user.keys"
import type { UserFilters } from "@/features/users/types/user.types"

export const usersQueryOptions = (filters: UserFilters) =>
  queryOptions({
    queryKey: userKeys.list(filters),
    queryFn: ({ signal }) => getUsers(filters, signal),
  })

export const useUsers = (filters: UserFilters) =>
  useSuspenseQuery(usersQueryOptions(filters))
