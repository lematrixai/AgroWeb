import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getDetectionResult } from "@/lib/results"

export default async function ResultDisplay({ id }: { id: string }) {
  const result = await getDetectionResult(id)

  if (!result) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Result not found. Please try again.</p>
      </div>
    )
  }

  const statusConfig = {
    healthy: {
      title: "Healthy",
      description: "Your maize plant appears to be healthy with no signs of disease.",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      image: "/placeholder.svg?height=300&width=400",
    },
    msv: {
      title: "Maize Streak Virus (MSV)",
      description: "Your plant shows symptoms of Maize Streak Virus, characterized by narrow white streaks on leaves.",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      image: "/placeholder.svg?height=300&width=400",
    },
    mln: {
      title: "Maize Lethal Necrosis (MLN)",
      description:
        "Your plant shows symptoms of Maize Lethal Necrosis, a severe disease that can cause complete crop failure.",
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      image: "/placeholder.svg?height=300&width=400",
    },
  }

  const config = statusConfig[result.status]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <div className={`flex items-center p-4 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
        <Icon className={`h-8 w-8 ${config.color} mr-3`} />
        <div>
          <h3 className={`font-bold text-lg ${config.color}`}>{config.title}</h3>
          <p className="text-gray-700">{config.description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">Confidence Score</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${result.status === "healthy" ? "bg-green-500" : result.status === "msv" ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">Detection Time</h4>
              <p className="font-medium">{new Date(result.timestamp).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">What This Means</h3>

        {result.status === "healthy" && (
          <div className="space-y-2">
            <p>Your maize plant appears healthy. Continue with your current farming practices:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Regular watering</li>
              <li>Proper fertilization</li>
              <li>Routine monitoring for pests and diseases</li>
            </ul>
          </div>
        )}

        {result.status === "msv" && (
          <div className="space-y-2">
            <p>Maize Streak Virus (MSV) is a serious disease transmitted by leafhoppers. Recommended actions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Remove and destroy infected plants</li>
              <li>Control leafhopper populations with appropriate insecticides</li>
              <li>Plant MSV-resistant varieties in future seasons</li>
              <li>Maintain weed-free fields to reduce leafhopper habitat</li>
            </ul>
          </div>
        )}

        {result.status === "mln" && (
          <div className="space-y-2">
            <p>
              Maize Lethal Necrosis (MLN) is a devastating disease caused by a combination of viruses. Urgent actions
              required:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Immediately remove and destroy all infected plants</li>
              <li>Implement strict field sanitation measures</li>
              <li>Control insect vectors with appropriate insecticides</li>
              <li>Consider crop rotation with non-cereal crops for at least two seasons</li>
              <li>Consult with local agricultural extension officers for additional guidance</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
