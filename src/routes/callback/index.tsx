import { createFileRoute, redirect } from "@tanstack/react-router"
import { authKeys } from "@/features/auth/hooks/use-auth-user"

// Redirect URI registered in Logto: http://localhost:5173/callback
export const Route = createFileRoute("/callback/")({
  ssr: false,
  beforeLoad: async ({ context }) => {
    const { redirectTo } = await context.auth.handleSignInCallback(
      window.location.href
    )
    await context.queryClient.invalidateQueries({ queryKey: authKeys.all })
    throw redirect({ href: redirectTo, replace: true })
  },
})
