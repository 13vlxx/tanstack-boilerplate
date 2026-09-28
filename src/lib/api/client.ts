import type { z } from "zod"
import { ApiError } from "@/lib/api/api-error"
import { authClient } from "@/lib/auth/auth"
import { env } from "@/lib/env"

type QueryValue = string | number | boolean | null | undefined

export type RequestOptions = {
  query?: Record<string, QueryValue>
  body?: unknown
  signal?: AbortSignal
}

type ApiMethod = {
  <TSchema extends z.ZodType>(
    path: string,
    options: RequestOptions & { schema: TSchema }
  ): Promise<z.output<TSchema>>
  (path: string, options?: RequestOptions): Promise<void>
}

const buildUrl = (path: string, query: RequestOptions["query"] = {}): URL => {
  const url = new URL(`${env.VITE_API_URL}${path}`)
  for (const [key, value] of Object.entries(query)) {
    if (value !== null && value !== undefined)
      url.searchParams.set(key, String(value))
  }
  return url
}

async function request(
  method: string,
  path: string,
  { query, body, signal }: RequestOptions
): Promise<unknown> {
  const headers = new Headers({ Accept: "application/json" })
  const token = await authClient.getAccessToken()
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const isFormData = body instanceof FormData
  // The browser sets the multipart boundary itself.
  if (body !== undefined && !isFormData)
    headers.set("Content-Type", "application/json")

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    signal,
    body: isFormData || body === undefined ? body : JSON.stringify(body),
  })

  if (!response.ok) throw await ApiError.fromResponse(response)
  if (response.status === 204) return undefined
  return response.json()
}

const createMethod = (method: string): ApiMethod =>
  (async (
    path: string,
    { schema, ...options }: RequestOptions & { schema?: z.ZodType } = {}
  ) => {
    const data = await request(method, path, options)
    return schema ? schema.parse(data) : undefined
  }) as ApiMethod

export const api = {
  get: createMethod("GET"),
  post: createMethod("POST"),
  put: createMethod("PUT"),
  patch: createMethod("PATCH"),
  delete: createMethod("DELETE"),
}
