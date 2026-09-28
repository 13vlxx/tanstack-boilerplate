import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRemoveProfilePicture } from "@/features/profile/hooks/use-remove-profile-picture"
import { useUpdateProfilePicture } from "@/features/profile/hooks/use-update-profile-picture"
import {
  PROFILE_PICTURE_MIME_TYPES,
  profilePictureSchema,
} from "@/features/profile/schemas/profile-picture.schema"
import { getErrorMessage } from "@/lib/api/api-error"

export function ProfilePictureForm({ hasPicture }: { hasPicture: boolean }) {
  const updatePicture = useUpdateProfilePicture()
  const removePicture = useRemoveProfilePicture()
  const form = useForm({ resolver: zodResolver(profilePictureSchema) })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // A file input keeps its selection until its form element is reset.
    const formElement = event.currentTarget
    void form.handleSubmit(({ file }) =>
      updatePicture.mutate(file, {
        onSuccess: () => {
          form.reset()
          formElement.reset()
        },
      })
    )(event)
  }

  const error = updatePicture.error ?? removePicture.error

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile picture</CardTitle>
        <CardDescription>JPEG, PNG or WebP, 8 MB maximum.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Controller
              name="file"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    ref={field.ref}
                    type="file"
                    accept={PROFILE_PICTURE_MIME_TYPES.join(",")}
                    onBlur={field.onBlur}
                    onChange={(event) =>
                      field.onChange(event.target.files?.[0])
                    }
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            {error && <FieldError>{getErrorMessage(error)}</FieldError>}
            <div className="flex gap-2">
              <Button type="submit" disabled={updatePicture.isPending}>
                {updatePicture.isPending ? "Uploading…" : "Upload"}
              </Button>
              {hasPicture && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={removePicture.isPending}
                  onClick={() => removePicture.mutate()}
                >
                  Remove
                </Button>
              )}
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
