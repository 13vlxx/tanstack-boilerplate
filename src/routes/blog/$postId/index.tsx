import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { ArrowLeftIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { PostDetail } from "@/features/posts/components/post-detail"
import { postQueryOptions, usePost } from "@/features/posts/hooks/use-post"
import { isApiError } from "@/lib/api/api-error"

export const Route = createFileRoute("/blog/$postId/")({
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.query({
        ...postQueryOptions(params.postId),
        staleTime: "static",
      })
    } catch (error) {
      // 400: not a uuid, 404: no such post.
      if (isApiError(error, 400) || isApiError(error, 404)) throw notFound()
      throw error
    }
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData?.title }] }),
  component: PostPage,
})

function PostPage() {
  const { postId } = Route.useParams()
  const { data: post } = usePost(postId)

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/blog"
        className={buttonVariants({
          variant: "ghost",
          className: "self-start",
        })}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        All posts
      </Link>
      <PostDetail post={post} />
    </div>
  )
}
