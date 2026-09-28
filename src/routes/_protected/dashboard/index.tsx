import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/common/page-header"
import { Pager } from "@/components/common/pager"
import { DeletePostButton } from "@/features/posts/components/delete-post-button"
import { POSTS_PAGE_SIZE } from "@/features/posts/api/get-posts"
import { PostForm } from "@/features/posts/components/post-form"
import { PostList } from "@/features/posts/components/post-list"
import { postsQueryOptions, usePosts } from "@/features/posts/hooks/use-posts"
import { hasNextPage, pageSearchSchema } from "@/lib/utils/pagination"

export const Route = createFileRoute("/_protected/dashboard/")({
  validateSearch: pageSearchSchema,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ context, deps }) =>
    context.queryClient.query({
      ...postsQueryOptions({ page: deps.page, authorId: context.user.id }),
      staleTime: "static",
    }),
  head: () => ({ meta: [{ title: "Dashboard" }] }),
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = Route.useRouteContext()
  const { page } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: posts } = usePosts({ page, authorId: user.id })

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Write and manage your posts."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[2fr_3fr]">
        <PostForm />
        <section>
          <PostList
            posts={posts}
            renderActions={(post) => <DeletePostButton postId={post.id} />}
          />
          <Pager
            page={page}
            hasNextPage={hasNextPage(posts, POSTS_PAGE_SIZE)}
            onPageChange={(nextPage) =>
              navigate({ search: { page: nextPage } })
            }
          />
        </section>
      </div>
    </>
  )
}
