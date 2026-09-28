import type { Post } from "@/features/posts/types/post.types"
import { formatDate } from "@/lib/utils/format-date"

export function PostDetail({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <time dateTime={post.createdAt} className="text-muted-foreground">
          {formatDate(post.createdAt)}
        </time>
      </header>
      <p className="leading-relaxed whitespace-pre-line">{post.content}</p>
    </article>
  )
}
