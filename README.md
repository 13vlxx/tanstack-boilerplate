# TanStack Start Boilerplate

Front-end of [nestjs12-boilerplate](../nestjs12-boilerplate): server-rendered
public pages, a Logto session in the browser, the API data cached by TanStack
Query, and a feature-based layout ready to grow.

Conventions for contributors and coding agents: [AGENTS.md](AGENTS.md).

## Stack

| Concern      | Choice                                                         |
| ------------ | -------------------------------------------------------------- |
| Framework    | TanStack Start (React 19, SSR, Vite 8)                         |
| Routing      | TanStack Router, file-based, typed search params and context   |
| Server state | TanStack Query, prefetched by route loaders, hydrated from SSR |
| Client state | Zustand (UI and preferences only)                              |
| Validation   | Zod 4: API responses, forms, search params, env                |
| Forms        | React Hook Form + `zodResolver`                                |
| UI           | shadcn/ui (Base UI) + Tailwind CSS 4, lucide icons             |
| Auth         | Logto (`@logto/browser`, single page app, PKCE)                |
| Tooling      | pnpm, ESLint (TanStack, Query, Router, hooks rules), Prettier  |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

The API (`pnpm start:dev` on port 3000) and its Docker services (Logto on
3001/3002) must be running; see the API's README. The port is fixed
(`strictPort`) because it is part of the redirect URIs registered in Logto.

### Logto

In the admin console (<http://localhost:3002>), on the _Single page app_
whose id is `VITE_LOGTO_APP_ID`:

| Setting                     | Value                            |
| --------------------------- | -------------------------------- |
| Redirect URIs               | `http://localhost:5173/callback` |
| Post sign-out redirect URIs | `http://localhost:5173`          |

The API resource, the `user` / `admin` roles and the `roles` claim of the
access tokens are created by the API's `pnpm seed`, along with the seeded
accounts.

### Configuration

Public values only: every `VITE_` variable ends up in the browser bundle.
They live in `.env.development` (committed) and are validated at startup by
[src/lib/env.ts](src/lib/env.ts). Override them in `.env.development.local`.

They are inlined **at build time**, and `pnpm build` runs in production mode,
which does not read `.env.development`: provide them through the build
environment (CI variables or `.env.production.local`), or the server refuses
to start with the list of missing variables. To try a build locally with the
development values: `pnpm build --mode development && pnpm preview`.

| Variable                  | Development value              | Description                                     |
| ------------------------- | ------------------------------ | ----------------------------------------------- |
| `VITE_API_URL`            | `http://localhost:3000/api/v1` | Base URL of the NestJS API                      |
| `VITE_LOGTO_ENDPOINT`     | `http://localhost:3001`        | Logto                                           |
| `VITE_LOGTO_APP_ID`       | —                              | Id of the Logto single page app                 |
| `VITE_LOGTO_API_RESOURCE` | `http://localhost:3000/api/v1` | The API's `LOGTO_API_RESOURCE` (token audience) |

## Scripts

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Dev server with HMR and the TanStack devtools |
| `pnpm build`     | Production build (`dist/`)                    |
| `pnpm preview`   | Serve the build (see _Configuration_)         |
| `pnpm typecheck` | `tsc --noEmit`                                |
| `pnpm lint`      | ESLint, including import cycles               |
| `pnpm format`    | Prettier                                      |

## Routes

| URL                      | Access    | Rendering | What                                       |
| ------------------------ | --------- | --------- | ------------------------------------------ |
| `/`                      | public    | SSR       | Home                                       |
| `/blog?page=`            | public    | SSR       | Posts, newest first (`GET /posts`)         |
| `/blog/:postId`          | public    | SSR       | One post (`GET /posts/:id`), 404 otherwise |
| `/login`, `/register`    | public    | client    | Sends to Logto, then back to `?redirect=`  |
| `/callback`              | public    | client    | Logto redirect URI                         |
| `/dashboard?page=`       | signed in | client    | My posts: create, delete                   |
| `/profile`               | signed in | client    | `GET /users/me`, profile picture upload    |
| `/admin`, `/admin/users` | admin     | client    | Users registered in Logto (`GET /users`)   |

Signed out on a signed-in page → `/login?redirect=…`. Signed in without the
`admin` role on an admin page → 404, as the API does.

## Project layout

```
src/
├── routes/        # routing only: guards, loaders, search params, page composition
├── features/      # one folder per domain: api/ hooks/ components/ schemas/ types/
├── components/    # ui/ (shadcn, generated), layout/, common/
├── lib/           # api/ (HTTP client), auth/ (the only place that knows Logto), query/, utils/, env.ts
├── stores/        # Zustand, client state only
└── types/         # global types
```

`features/posts` is the complete example: endpoint functions and query keys
in `api/`, queryOptions and mutation hooks in `hooks/`, Zod schemas
mirroring the API's DTOs in `schemas/`.

## Authentication

- Logto hosts sign-in, sign-up, password reset and MFA. The app redirects
  there (authorization code + PKCE) and asks for an access token **for the
  API resource**, sent as `Authorization: Bearer` by the HTTP client.
- The signed-in user (`{ id, roles }`) is read from that access token: the
  same `sub` and `roles` the API checks.
- Tokens are kept by the Logto SDK in the browser storage, so every page
  that depends on the session renders on the client (`ssr: false`); public
  pages render on the server without a token.
- `routes/_protected/route.tsx` guards every signed-in page and
  `routes/_protected/admin/route.tsx` adds the role check. They shape the
  experience; the API authorizes every request on its own.

Add shadcn components with `pnpm exec shadcn add <name>`: they land in
`src/components/ui/`.
