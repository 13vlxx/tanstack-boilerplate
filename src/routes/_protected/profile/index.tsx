import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/common/page-header"
import { ProfileCard } from "@/features/profile/components/profile-card"
import { ProfilePictureForm } from "@/features/profile/components/profile-picture-form"
import { meQueryOptions, useMe } from "@/features/profile/hooks/use-me"

export const Route = createFileRoute("/_protected/profile/")({
  loader: ({ context }) =>
    context.queryClient.query({ ...meQueryOptions(), staleTime: "static" }),
  head: () => ({ meta: [{ title: "Profile" }] }),
  component: ProfilePage,
})

function ProfilePage() {
  const { user } = Route.useRouteContext()
  const { data: profile } = useMe()

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account, as the API sees it."
      />
      <div className="grid items-start gap-6 md:grid-cols-2">
        <ProfileCard profile={profile} roles={user.roles} />
        <ProfilePictureForm hasPicture={profile.profilePictureUrl !== null} />
      </div>
    </>
  )
}
