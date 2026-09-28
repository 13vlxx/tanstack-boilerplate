import { Link } from "@tanstack/react-router"
import { MenuIcon, XIcon } from "lucide-react"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { UserMenu } from "@/components/layout/user-menu"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthUser } from "@/features/auth/hooks/use-auth-user"
import { hasRole } from "@/lib/auth/auth-client"
import type { AuthUser } from "@/lib/auth/auth-client"
import { useUiStore } from "@/stores/ui.store"

const linkClassName =
  "text-sm text-muted-foreground transition-colors hover:text-foreground"
const activeProps = { className: "text-foreground font-medium" }

type NavLinksProps = {
  user?: AuthUser | null
  onNavigate?: () => void
}

function NavLinks({ user, onNavigate }: NavLinksProps) {
  return (
    <>
      <Link
        to="/blog"
        className={linkClassName}
        activeProps={activeProps}
        onClick={onNavigate}
      >
        Blog
      </Link>
      {user && (
        <Link
          to="/dashboard"
          className={linkClassName}
          activeProps={activeProps}
          onClick={onNavigate}
        >
          Dashboard
        </Link>
      )}
      {user && hasRole(user, "admin") && (
        <Link
          to="/admin"
          className={linkClassName}
          activeProps={activeProps}
          onClick={onNavigate}
        >
          Admin
        </Link>
      )}
    </>
  )
}

function AuthActions({ user }: { user?: AuthUser | null }) {
  if (user === undefined) return <Skeleton className="size-8 rounded-full" />
  if (user) return <UserMenu />

  return (
    <>
      <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
        Sign in
      </Link>
      <Link
        to="/register"
        className={buttonVariants({ className: "max-sm:hidden" })}
      >
        Register
      </Link>
    </>
  )
}

export function Navbar() {
  const user = useAuthUser()
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen)
  const toggleMobileNav = useUiStore((state) => state.toggleMobileNav)
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen)

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-4">
        <Link to="/" className="font-heading font-semibold">
          Boilerplate
        </Link>
        <nav className="flex items-center gap-4 max-sm:hidden">
          <NavLinks user={user} />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AuthActions user={user} />
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Menu"
            aria-expanded={isMobileNavOpen}
            onClick={toggleMobileNav}
          >
            {isMobileNavOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>
      {isMobileNavOpen && (
        <nav className="flex flex-col gap-3 border-t px-4 py-3 sm:hidden">
          <NavLinks user={user} onNavigate={() => setMobileNavOpen(false)} />
        </nav>
      )}
    </header>
  )
}
