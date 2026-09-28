import { queryOptions, useQuery } from "@tanstack/react-query"
import { useHydrated } from "@tanstack/react-router"
import { useAuthClient } from "@/features/auth/hooks/use-auth-client"
import type { AuthClient, AuthUser } from "@/lib/auth/auth-client"

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
}

export const authUserQueryOptions = (auth: AuthClient) =>
  queryOptions({
    queryKey: authKeys.user(),
    queryFn: () => auth.getUser(),
  })

// Client-only guards can fill the cache before hydration, but the first
// render must match the server HTML, where the user is unknown.
export const useAuthUser = (): AuthUser | null | undefined => {
  const isHydrated = useHydrated()
  const { data } = useQuery(authUserQueryOptions(useAuthClient()))
  return isHydrated ? data : undefined
}
