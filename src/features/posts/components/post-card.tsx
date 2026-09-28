import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Post } from "@/features/posts/types/post.types"
import { formatDate } from "@/lib/utils/format-date"

type PostCardProps = {
  post: Post
  actions?: ReactNode
}

export function PostCard({ post, actions }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            to="/blog/$postId"
            params={{ postId: post.id }}
            className="hover:underline"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </CardDescription>
        {actions && <CardAction>{actions}</CardAction>}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 whitespace-pre-line text-muted-foreground">
          {post.content}
        </p>
      </CardContent>
    </Card>
  )
}
