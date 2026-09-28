import { EmptyState } from "@/components/common/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserAvatar } from "@/features/users/components/user-avatar"
import type { User } from "@/features/users/types/user.types"

export function UsersTable({ users }: { users: User[] }) {
  if (users.length === 0) return <EmptyState title="No users" />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Logto id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <UserAvatar user={user} size="sm" />
                {user.name ?? "—"}
              </div>
            </TableCell>
            <TableCell>{user.email ?? "—"}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {user.id}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
