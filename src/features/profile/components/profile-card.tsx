import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserAvatar } from "@/features/users/components/user-avatar"
import type { User } from "@/features/users/types/user.types"

type ProfileCardProps = {
  profile: User
  roles: string[]
}

export function ProfileCard({ profile, roles }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <UserAvatar user={profile} size="lg" />
        <div className="flex min-w-0 flex-col gap-1">
          <CardTitle className="truncate">
            {profile.name ?? "No name"}
          </CardTitle>
          <CardDescription className="truncate">
            {profile.email ?? "No email"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Logto id</dt>
          <dd className="truncate font-mono text-xs leading-5">{profile.id}</dd>
          <dt className="text-muted-foreground">Roles</dt>
          <dd className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <Badge key={role} variant="secondary">
                {role}
              </Badge>
            ))}
          </dd>
        </dl>
      </CardContent>
    </Card>
  )
}
