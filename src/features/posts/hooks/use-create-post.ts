import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "@/features/posts/api/create-post"
import { postKeys } from "@/features/posts/api/post.keys"

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      queryClient.setQueryData(postKeys.detail(post.id), post)
      return queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}
