import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/features/users/types/user.types"

type UserAvatarProps = {
  user?: Pick<User, "name" | "email" | "profilePictureUrl">
  size?: "sm" | "default" | "lg"
  className?: string
}

const getInitials = (label: string): string =>
  label
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")

export function UserAvatar({ user, size, className }: UserAvatarProps) {
  const label = user?.name ?? user?.email ?? ""

  return (
    <Avatar size={size} className={className}>
      {user?.profilePictureUrl && (
        <AvatarImage src={user.profilePictureUrl} alt={label} />
      )}
      <AvatarFallback>{getInitials(label) || "?"}</AvatarFallback>
    </Avatar>
  )
}
