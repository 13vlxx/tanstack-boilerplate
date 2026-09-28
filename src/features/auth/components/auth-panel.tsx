import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthClient } from "@/features/auth/hooks/use-auth-client"

type AuthPanelProps = {
  screen: "signIn" | "register"
  redirectTo?: string
}

export function AuthPanel({
  screen,
  redirectTo = "/dashboard",
}: AuthPanelProps) {
  const auth = useAuthClient()
  const [isRedirecting, setRedirecting] = useState(false)
  const isSignIn = screen === "signIn"

  const onContinue = () => {
    setRedirecting(true)
    void auth.signIn({ screen, redirectTo })
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{isSignIn ? "Sign in" : "Create an account"}</CardTitle>
        <CardDescription>
          You will continue on the secure sign-in page, then come back here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={onContinue} disabled={isRedirecting}>
          {isSignIn ? "Continue to sign in" : "Continue to sign up"}
        </Button>
        <p className="text-sm text-muted-foreground">
          {isSignIn ? (
            <>
              No account yet?{" "}
              <Link
                to="/register"
                search={{ redirect: redirectTo }}
                className="text-foreground underline underline-offset-4"
              >
                Create one
              </Link>
            </>
          ) : (
            <>
              Already registered?{" "}
              <Link
                to="/login"
                search={{ redirect: redirectTo }}
                className="text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  )
}
