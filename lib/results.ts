import type { DetectionResult } from "@/lib/detect-disease"

// In a real application, this would be stored in a database
const resultsCache = new Map<string, DetectionResult>()

export async function saveDetectionResult(result: DetectionResult): Promise<void> {
  resultsCache.set(result.id, result)

  // In a real application, you would save this to a database
  // Example with Supabase:
  /*
  const { error } = await supabase
    .from('detection_results')
    .insert([result])
  
  if (error) {
    console.error('Error saving result to database:', error)
    throw error
  }
  */
}

export async function getDetectionResult(id: string): Promise<DetectionResult | null> {
  return resultsCache.get(id) || null
}

export async function getAllDetectionResults(): Promise<DetectionResult[]> {
  // In a real application, you would fetch this from a database
  // Example with Supabase:
  /*
  const { data, error } = await supabase
    .from('detection_results')
    .select('*')
    .order('timestamp', { ascending: false })
  
  if (error) {
    console.error('Error fetching results from database:', error)
    return []
  }
  
  return data
  */

  // For demo purposes, return the cached results
  return Array.from(resultsCache.values())
}
