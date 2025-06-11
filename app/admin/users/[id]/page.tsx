import { Suspense } from "react"
import EditUserForm from "./edit-user-form"
interface PageProps {
  params: {
    id: string
  }
}

export default function EditUserPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black/[0.96] antialiased flex items-center justify-center">
        <div className="text-gray-400">Loading user data...</div>
      </div>
    }>
      <EditUserForm userId={params.id} />
    </Suspense>
  )
} 