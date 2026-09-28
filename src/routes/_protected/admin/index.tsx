import { Link, createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/common/page-header"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/_protected/admin/")({
  head: () => ({ meta: [{ title: "Administration" }] }),
  component: AdminPage,
})

function AdminPage() {
  return (
    <>
      <PageHeader title="Administration" />
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Accounts registered in Logto.</CardDescription>
          <CardAction>
            <Link
              to="/admin/users"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Open
            </Link>
          </CardAction>
        </CardHeader>
      </Card>
    </>
  )
}
