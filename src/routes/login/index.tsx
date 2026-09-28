import { createFileRoute, redirect } from "@tanstack/react-router"
import { AuthPanel } from "@/features/auth/components/auth-panel"
import { authSearchSchema } from "@/features/auth/schemas/auth-search.schema"
import { authUserQueryOptions } from "@/features/auth/hooks/use-auth-user"

export const Route = createFileRoute("/login/")({
  validateSearch: authSearchSchema,
  ssr: false,
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.query(
      authUserQueryOptions(context.auth)
    )
    if (user) throw redirect({ href: search.redirect ?? "/dashboard" })
  },
  component: LoginPage,
})

function LoginPage() {
  const { redirect: redirectTo } = Route.useSearch()
  return <AuthPanel screen="signIn" redirectTo={redirectTo} />
}
