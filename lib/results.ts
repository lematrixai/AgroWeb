import type { DetectionResult } from "./detect-disease"

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
  // First check the in-memory cache
  if (resultsCache.has(id)) {
    return resultsCache.get(id) || null
  }

  // In a real application, you would fetch this from a database
  // Example with Supabase:
  /*
  const { data, error } = await supabase
    .from('detection_results')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching result from database:', error)
    return null
  }
  
  return data
  */

  // For demo purposes, create a mock result
  const mockResult: DetectionResult = {
    id,
    status: Math.random() > 0.6 ? "healthy" : Math.random() > 0.5 ? "msv" : "mln",
    confidence: 0.7 + Math.random() * 0.29,
    timestamp: new Date().toISOString(),
    location: {
      lat: 0.3476 + Math.random() * 0.1,
      lng: 32.5825 + Math.random() * 0.1,
    },
  }

  // Save to cache
  resultsCache.set(id, mockResult)

  return mockResult
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
