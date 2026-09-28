import { Link } from "@tanstack/react-router"
import { EmptyState } from "@/components/common/empty-state"
import { buttonVariants } from "@/components/ui/button"

export function NotFoundState() {
  return (
    <EmptyState
      title="Page not found"
      description="The page you are looking for does not exist."
      action={
        <Link to="/" className={buttonVariants({ variant: "outline" })}>
          Back home
        </Link>
      }
    />
  )
}
