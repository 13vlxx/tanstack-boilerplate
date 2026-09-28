import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/common/page-header"
import { Pager } from "@/components/common/pager"
import { POSTS_PAGE_SIZE } from "@/features/posts/api/get-posts"
import { PostList } from "@/features/posts/components/post-list"
import { postsQueryOptions, usePosts } from "@/features/posts/hooks/use-posts"
import { hasNextPage, pageSearchSchema } from "@/lib/utils/pagination"

export const Route = createFileRoute("/blog/")({
  validateSearch: pageSearchSchema,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ context, deps }) =>
    context.queryClient.query({
      ...postsQueryOptions(deps),
      staleTime: "static",
    }),
  head: () => ({ meta: [{ title: "Blog" }] }),
  component: BlogPage,
})

function BlogPage() {
  const { page } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: posts } = usePosts({ page })

  return (
    <>
      <PageHeader title="Blog" description="Every post, newest first." />
      <PostList posts={posts} />
      <Pager
        page={page}
        hasNextPage={hasNextPage(posts, POSTS_PAGE_SIZE)}
        onPageChange={(nextPage) => navigate({ search: { page: nextPage } })}
      />
    </>
  )
}
