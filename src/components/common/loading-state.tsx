import { LoaderCircleIcon } from "lucide-react"

export function LoadingState() {
  return (
    <div
      role="status"
      className="flex justify-center py-16 text-muted-foreground"
    >
      <LoaderCircleIcon className="size-6 animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
