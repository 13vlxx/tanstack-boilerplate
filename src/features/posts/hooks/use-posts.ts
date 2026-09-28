import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { getPosts } from "@/features/posts/api/get-posts"
import { postKeys } from "@/features/posts/api/post.keys"
import type { PostFilters } from "@/features/posts/types/post.types"

export const postsQueryOptions = (filters: PostFilters) =>
  queryOptions({
    queryKey: postKeys.list(filters),
    queryFn: ({ signal }) => getPosts(filters, signal),
  })

export const usePosts = (filters: PostFilters) =>
  useSuspenseQuery(postsQueryOptions(filters))
