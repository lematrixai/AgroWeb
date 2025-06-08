import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ResultDisplay from "@/components/result-display"
import LoadingSkeleton from "@/components/loading-skeleton"

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const id = searchParams.id

  if (!id) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-12">
      <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Detection Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoadingSkeleton />}>
            <ResultDisplay id={id} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button asChild>
            <Link href={`/chat?resultId=${id}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Get More Help
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
