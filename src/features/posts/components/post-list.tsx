import type { ReactNode } from "react"
import { EmptyState } from "@/components/common/empty-state"
import { PostCard } from "@/features/posts/components/post-card"
import type { Post } from "@/features/posts/types/post.types"

type PostListProps = {
  posts: Post[]
  renderActions?: (post: Post) => ReactNode
}

export function PostList({ posts, renderActions }: PostListProps) {
  if (posts.length === 0) return <EmptyState title="No posts yet" />

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} actions={renderActions?.(post)} />
        </li>
      ))}
    </ul>
  )
}
