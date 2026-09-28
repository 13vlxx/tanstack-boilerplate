import { createFileRoute, redirect } from "@tanstack/react-router"
import { authUserQueryOptions } from "@/features/auth/hooks/use-auth-user"

export const Route = createFileRoute("/_protected")({
  // Tokens live in the browser: the guard can only run there.
  ssr: false,
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.query(
      authUserQueryOptions(context.auth)
    )
    if (!user) {
      throw redirect({ to: "/login", search: { redirect: location.href } })
    }
    return { user }
  },
})
