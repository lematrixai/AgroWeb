import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Card } from "@/components/ui/card"
import ChatInterface from "@/components/chat-interface"
import LoadingSkeleton from "@/components/loading-skeleton"

export default function ChatPage({
  searchParams,
}: {
  searchParams: { resultId?: string }
}) {
  const resultId = searchParams.resultId

  return (
    <div className="container max-w-4xl py-12">
      <Link
        href={resultId ? `/results?id=${resultId}` : "/"}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {resultId ? "Results" : "Home"}
      </Link>

      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>

      <Card className="min-h-[500px]">
        <Suspense fallback={<LoadingSkeleton />}>
          <ChatInterface resultId={resultId} />
        </Suspense>
      </Card>
    </div>
  )
}
