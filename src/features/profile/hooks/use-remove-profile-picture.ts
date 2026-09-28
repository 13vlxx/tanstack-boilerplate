import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profileKeys } from "@/features/profile/api/profile.keys"
import { removeProfilePicture } from "@/features/profile/api/remove-profile-picture"

export const useRemoveProfilePicture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeProfilePicture,
    onSuccess: (me) => queryClient.setQueryData(profileKeys.me(), me),
  })
}
