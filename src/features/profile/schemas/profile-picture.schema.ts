import { z } from "zod"

export const PROFILE_PICTURE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
]
const PROFILE_PICTURE_MAX_SIZE = 8 * 1024 * 1024

export const profilePictureSchema = z.object({
  file: z
    .file({ error: "Choose an image" })
    .max(PROFILE_PICTURE_MAX_SIZE, "The image must be 8 MB or less")
    .mime(PROFILE_PICTURE_MIME_TYPES, "JPEG, PNG or WebP only"),
})
