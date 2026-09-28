import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profileKeys } from "@/features/profile/api/profile.keys"
import { updateProfilePicture } from "@/features/profile/api/update-profile-picture"

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: (me) => queryClient.setQueryData(profileKeys.me(), me),
  })
}
