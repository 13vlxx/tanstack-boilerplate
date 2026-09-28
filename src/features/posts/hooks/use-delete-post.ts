import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "@/features/posts/api/delete-post"
import { postKeys } from "@/features/posts/api/post.keys"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: postKeys.detail(id) })
      return queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}
