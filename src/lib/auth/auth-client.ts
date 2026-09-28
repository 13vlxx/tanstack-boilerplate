export const USER_ROLES = ["user", "admin"] as const
export type UserRole = (typeof USER_ROLES)[number]

export const isUserRole = (role: string): role is UserRole =>
  USER_ROLES.some((userRole) => userRole === role)

export type AuthUser = {
  id: string
  roles: UserRole[]
}

export const hasRole = (user: AuthUser, role: UserRole): boolean =>
  user.roles.includes(role)

export type SignInOptions = {
  redirectTo?: string
  screen?: "signIn" | "register"
}

export interface AuthClient {
  getUser: () => Promise<AuthUser | null>
  getAccessToken: () => Promise<string | null>
  signIn: (options?: SignInOptions) => Promise<void>
  signOut: () => Promise<void>
  handleSignInCallback: (callbackUrl: string) => Promise<{ redirectTo: string }>
}
