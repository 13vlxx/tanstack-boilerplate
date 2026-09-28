import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Theme } from "@/lib/utils/theme"

export const PREFERENCES_STORAGE_KEY = "preferences"

type PreferencesState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: PREFERENCES_STORAGE_KEY,
      // Rehydrated after mount (ThemeSync): reading localStorage during the
      // first render would not match the HTML rendered on the server.
      skipHydration: true,
    }
  )
)
