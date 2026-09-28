import { createFileRoute, notFound } from "@tanstack/react-router"
import { hasRole } from "@/lib/auth/auth-client"

export const Route = createFileRoute("/_protected/admin")({
  beforeLoad: ({ context }) => {
    if (!hasRole(context.user, "admin")) throw notFound()
  },
})
