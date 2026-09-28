import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { getPost } from "@/features/posts/api/get-post"
import { postKeys } from "@/features/posts/api/post.keys"

export const postQueryOptions = (id: string) =>
  queryOptions({
    queryKey: postKeys.detail(id),
    queryFn: ({ signal }) => getPost(id, signal),
  })

export const usePost = (id: string) => useSuspenseQuery(postQueryOptions(id))
