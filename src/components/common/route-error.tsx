import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"
import { ErrorState } from "@/components/common/error-state"

export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter()
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  const retry = () => {
    queryErrorResetBoundary.reset()
    void router.invalidate()
  }

  return <ErrorState error={error} onRetry={retry} />
}
