import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreatePost } from "@/features/posts/hooks/use-create-post"
import { createPostSchema } from "@/features/posts/schemas/post.schema"
import { getErrorMessage } from "@/lib/api/api-error"

export function PostForm() {
  const createPost = useCreatePost()
  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "" },
  })

  const onSubmit = form.handleSubmit((input) =>
    createPost.mutate(input, { onSuccess: () => form.reset() })
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>New post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    rows={6}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            {createPost.isError && (
              <FieldError>{getErrorMessage(createPost.error)}</FieldError>
            )}
            <Button type="submit" disabled={createPost.isPending}>
              {createPost.isPending ? "Publishing…" : "Publish"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
