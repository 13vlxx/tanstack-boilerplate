import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // Fixed port: it is part of the redirect URIs registered in Logto, and the
  // NestJS API already listens on 3000.
  server: { port: 5173, strictPort: true },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
})

export default config
