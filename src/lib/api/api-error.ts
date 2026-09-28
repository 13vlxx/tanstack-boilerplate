import { z } from "zod"

const errorBodySchema = z
  .object({ message: z.union([z.string(), z.array(z.string())]) })
  .partial()

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly body: unknown

  constructor(status: number, code: string, body: unknown) {
    super(code)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.body = body
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    const body: unknown = await response.json().catch(() => null)
    const parsed = errorBodySchema.safeParse(body)
    const message = parsed.success ? parsed.data.message : undefined
    const code = Array.isArray(message)
      ? message.join(", ")
      : (message ?? response.statusText)
    return new ApiError(response.status, code, body)
  }
}

export const isApiError = (
  error: unknown,
  status?: number
): error is ApiError =>
  error instanceof ApiError && (status === undefined || error.status === status)

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) return error.code
  if (error instanceof Error) return error.message
  return "Something went wrong"
}
