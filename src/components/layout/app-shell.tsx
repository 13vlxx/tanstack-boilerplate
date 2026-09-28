import type { ReactNode } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ThemeSync } from "@/components/layout/theme-sync"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <ThemeSync />
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  )
}
