import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { getMe } from "@/features/profile/api/get-me"
import { profileKeys } from "@/features/profile/api/profile.keys"

export const meQueryOptions = () =>
  queryOptions({
    queryKey: profileKeys.me(),
    queryFn: ({ signal }) => getMe(signal),
  })

export const useMe = () => useSuspenseQuery(meQueryOptions())
