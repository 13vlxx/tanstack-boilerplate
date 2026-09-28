import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { LayoutDashboardIcon, LogOutIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthClient } from "@/features/auth/hooks/use-auth-client"
import { meQueryOptions } from "@/features/profile/hooks/use-me"
import { UserAvatar } from "@/features/users/components/user-avatar"

export function UserMenu() {
  const auth = useAuthClient()
  // Not suspending: the navbar must render even if the API is down.
  const { data: me } = useQuery(meQueryOptions())

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Account menu"
          />
        }
      >
        <UserAvatar user={me} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="truncate">
            {me?.name ?? me?.email ?? "My account"}
          </DropdownMenuLabel>
          <DropdownMenuItem render={<Link to="/dashboard" />}>
            <LayoutDashboardIcon />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link to="/profile" />}>
            <UserIcon />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void auth.signOut()}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
