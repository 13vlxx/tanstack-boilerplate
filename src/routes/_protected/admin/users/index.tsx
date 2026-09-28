import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/common/page-header"
import { Pager } from "@/components/common/pager"
import { USERS_PAGE_SIZE } from "@/features/users/api/get-users"
import { UsersTable } from "@/features/users/components/users-table"
import { useUsers, usersQueryOptions } from "@/features/users/hooks/use-users"
import { hasNextPage, pageSearchSchema } from "@/lib/utils/pagination"

export const Route = createFileRoute("/_protected/admin/users/")({
  validateSearch: pageSearchSchema,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ context, deps }) =>
    context.queryClient.query({
      ...usersQueryOptions(deps),
      staleTime: "static",
    }),
  head: () => ({ meta: [{ title: "Users" }] }),
  component: AdminUsersPage,
})

function AdminUsersPage() {
  const { page } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: users } = useUsers({ page })

  return (
    <>
      <PageHeader title="Users" />
      <UsersTable users={users} />
      <Pager
        page={page}
        hasNextPage={hasNextPage(users, USERS_PAGE_SIZE)}
        onPageChange={(nextPage) => navigate({ search: { page: nextPage } })}
      />
    </>
  )
}
