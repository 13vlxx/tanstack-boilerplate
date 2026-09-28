import { createRouter } from "@tanstack/react-router"
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"
import { LoadingState } from "@/components/common/loading-state"
import { NotFoundState } from "@/components/common/not-found-state"
import { RouteError } from "@/components/common/route-error"
import { authClient } from "@/lib/auth/auth"
import { createQueryClient } from "@/lib/query/query-client"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
  const queryClient = createQueryClient()

  const router = createRouter({
    routeTree,
    context: { queryClient, auth: authClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    // Loaders only warm TanStack Query, which decides what is stale.
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: LoadingState,
    defaultErrorComponent: RouteError,
    defaultNotFoundComponent: NotFoundState,
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
