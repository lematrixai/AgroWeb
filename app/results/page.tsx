import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import ResultsList from "@/components/results-list"
import LoadingSkeleton from "@/components/loading-skeleton"
import { BackgroundBeams } from "@/components/ui/background-beams"

const words = [
  {
    text: "Detection",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Results",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <BackgroundBeams />
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
          <TypewriterEffect words={words} className="text-2xl sm:text-3xl font-bold" />
        </div>

        <TracingBeam className="px-4 sm:px-6">
          <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
            <Suspense fallback={<LoadingSkeleton />}>
              <ResultsList />
            </Suspense>
          </Card>
        </TracingBeam>
      </div>
    </div>
  )
}
