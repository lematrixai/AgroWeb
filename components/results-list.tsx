"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Result = {
  id: string
  status: "healthy" | "msv" | "mln"
  timestamp: string
  imageUrl: string
}

export default function ResultsList() {
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    // In a real application, this would fetch from your API
    const mockResults: Result[] = [
      {
        id: "1",
        status: "healthy",
        timestamp: "2024-03-15T10:30:00Z",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "2",
        status: "msv",
        timestamp: "2024-03-14T15:45:00Z",
        imageUrl: "/placeholder.svg",
      },
    ]
    setResults(mockResults)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 border border-gray-800 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        result.status === "healthy"
                          ? "bg-green-500/20 text-green-400"
                          : result.status === "msv"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      )}
                    >
                      {result.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-400">
                      <Calendar className="inline-block h-4 w-4 mr-1" />
                      {new Date(result.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Maize Plant Analysis
                  </h3>
                </div>
                <Link
                  href={`/chat?resultId=${result.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Get Help
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 