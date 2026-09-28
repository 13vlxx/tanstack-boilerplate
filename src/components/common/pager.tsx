import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type PagerProps = {
  page: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

export function Pager({ page, hasNextPage, onPageChange }: PagerProps) {
  if (page === 1 && !hasNextPage) return null

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeftIcon data-icon="inline-start" />
        Previous
      </Button>
      <span className="px-2 text-sm text-muted-foreground">Page {page}</span>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRightIcon data-icon="inline-end" />
      </Button>
    </nav>
  )
}
