export type DiseaseStatus = 'healthy' | 'msv' | 'mln'

export interface DetectionResult {
  id: string
  status: DiseaseStatus
  confidence: number
  message: string
  timestamp: number
  imageUrl?: string
}

export interface PredictionResult {
  error: boolean
  message: string
  predictions: Array<{
    label: string
    score: number
  }>
  topPrediction: {
    label: string
    confidence: string
  }
} 