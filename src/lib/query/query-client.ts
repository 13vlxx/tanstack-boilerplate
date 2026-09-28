import { QueryClient } from "@tanstack/react-query"
import { ApiError } from "@/lib/api/api-error"

// Called once per request on the server and once in the browser (getRouter):
// never share a QueryClient between users.
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.isClientError) &&
          failureCount < 2,
      },
    },
  })
}
