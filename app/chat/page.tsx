import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card } from "@/components/ui/card"
import ChatInterface from "@/components/chat-interface"
import LoadingSkeleton from "@/components/loading-skeleton"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"

type PageProps = {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ChatPage({ searchParams }: PageProps) {
  const params = await searchParams
  const resultId = Array.isArray(params?.resultId) 
    ? params.resultId[0] 
    : params?.resultId || undefined

  const words = [
    { text: "AI", className: "text-blue-500 dark:text-blue-500" },
    { text: "Agricultural", className: "text-blue-500 dark:text-blue-500" },
    { text: "Assistant", className: "text-blue-500 dark:text-blue-500" },
  ]

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <BackgroundBeams />

      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href={resultId ? `/results?id=${resultId}` : "/"}
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to {resultId ? "Results" : "Home"}
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
          <TypewriterEffect words={words} className="text-2xl sm:text-3xl font-bold" />
        </div>

        <TracingBeam className="px-4 sm:px-6">
          <Card className="min-h-[500px] sm:min-h-[600px] border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
            <Suspense fallback={<LoadingSkeleton />}>
              <ChatInterface resultId={resultId} />
            </Suspense>
          </Card>
        </TracingBeam>
      </div>
    </div>
  )
}
