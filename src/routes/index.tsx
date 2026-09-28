import { Link, createFileRoute } from "@tanstack/react-router"
import { buttonVariants } from "@/components/ui/button"

export const Route = createFileRoute("/")({ component: HomePage })

function HomePage() {
  return (
    <section className="flex flex-col items-start gap-4 py-12">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        TanStack Start × NestJS
      </h1>
      <p className="max-w-prose text-muted-foreground">
        Server-rendered public pages, a Logto session in the browser, and the
        API data cached by TanStack Query.
      </p>
      <div className="flex gap-2">
        <Link to="/blog" className={buttonVariants()}>
          Read the blog
        </Link>
        <Link
          to="/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          Dashboard
        </Link>
      </div>
    </section>
  )
}
