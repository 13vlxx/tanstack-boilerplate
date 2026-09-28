import LogtoClient from "@logto/browser"
import { z } from "zod"
import { isUserRole } from "@/lib/auth/auth-client"
import type { AuthClient } from "@/lib/auth/auth-client"
import { env } from "@/lib/env"

const CALLBACK_PATH = "/callback"
const REDIRECT_TO_KEY = "auth:redirect-to"

// `roles` is added to the API's access tokens by the Custom JWT script that
// the API's `pnpm seed` installs in Logto.
const accessTokenClaimsSchema = z.object({
  sub: z.string().min(1),
  roles: z.array(z.string()).catch([]),
})

let client: LogtoClient | undefined

const getClient = (): LogtoClient | null => {
  if (typeof window === "undefined") return null
  client ??= new LogtoClient({
    endpoint: env.VITE_LOGTO_ENDPOINT,
    appId: env.VITE_LOGTO_APP_ID,
    resources: [env.VITE_LOGTO_API_RESOURCE],
  })
  return client
}

const getAuthenticatedClient = async (): Promise<LogtoClient | null> => {
  const logto = getClient()
  return logto && (await logto.isAuthenticated()) ? logto : null
}

export const logtoAuthClient: AuthClient = {
  async getUser() {
    const logto = await getAuthenticatedClient()
    if (!logto) return null
    try {
      const claims = await logto.getAccessTokenClaims(
        env.VITE_LOGTO_API_RESOURCE
      )
      const { sub, roles } = accessTokenClaimsSchema.parse(claims)
      return { id: sub, roles: roles.filter(isUserRole) }
    } catch {
      // The refresh token expired or was revoked: signed out in practice.
      return null
    }
  },

  async getAccessToken() {
    const logto = await getAuthenticatedClient()
    if (!logto) return null
    try {
      return await logto.getAccessToken(env.VITE_LOGTO_API_RESOURCE)
    } catch {
      return null
    }
  },

  async signIn({ redirectTo = "/", screen = "signIn" } = {}) {
    const logto = getClient()
    if (!logto) return
    sessionStorage.setItem(REDIRECT_TO_KEY, redirectTo)
    await logto.signIn({
      redirectUri: new URL(CALLBACK_PATH, window.location.origin).href,
      firstScreen: screen,
    })
  },

  async signOut() {
    await getClient()?.signOut(window.location.origin)
  },

  async handleSignInCallback(callbackUrl) {
    const logto = getClient()
    if (!logto) throw new Error("The sign-in callback only runs in the browser")
    await logto.handleSignInCallback(callbackUrl)
    const redirectTo = sessionStorage.getItem(REDIRECT_TO_KEY) ?? "/"
    sessionStorage.removeItem(REDIRECT_TO_KEY)
    return { redirectTo }
  },
}
