"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, XCircle, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type DiseaseStatus = 'healthy' | 'msv' | 'mln'

interface ResultDisplayProps {
  result: {
    status: DiseaseStatus
    confidence: string
    message: string
  }
}

const statusConfig = {
  healthy: {
    title: "Healthy Plant",
    description: "Your corn plant appears to be healthy and thriving.",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    image: "/images/healthy-corn.jpg"
  },
  msv: {
    title: "Maize Streak Virus",
    description: "Your corn plant shows signs of Maize Streak Virus infection.",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    image: "/images/msv-corn.jpg"
  },
  mln: {
    title: "Maize Lethal Necrosis",
    description: "Your corn plant shows signs of Maize Lethal Necrosis disease.",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    image: "/images/mln-corn.jpg"
  }
} as const

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const router = useRouter()

  const handleChat = () => {
    const searchParams = new URLSearchParams({
      message: result.message,
      disease: result.status,
      confidence: result.confidence
    })
    router.push(`/chat?${searchParams.toString()}`)
  }

  const config = statusConfig[result.status]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${config.borderColor} ${config.bgColor}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className={`text-lg font-semibold ${config.color}`}>
            {config.title}
          </h3>
          <p className="text-gray-300">{config.description}</p>
          <div className="pt-2">
            <p className="text-sm text-gray-400">
              Confidence: {result.confidence}%
            </p>
          </div>
          <Button
            onClick={handleChat}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Leaf className="h-4 w-4 mr-2" />
            Get Treatment Advice
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
