export type DetectionResult = {
  id: string
  status: "healthy" | "msv" | "mln"
  confidence: number
  timestamp: string
  location?: {
    lat: number
    lng: number
  }
}

export async function detectDisease(file: File): Promise<DetectionResult> {
  // Create a FormData instance to send the file
  const formData = new FormData()
  formData.append("image", file)

  try {
    // Get the user's location if available
    let location
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: true,
          })
        })

        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      } catch (error) {
        console.warn("Could not get user location:", error)
      }
    }

    // In a real app, you would send the image to your API endpoint
    // which would then forward it to Hugging Face
    const response = await fetch("/api/detect", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to detect disease")
    }

    const data = await response.json()

    // Add location and timestamp to the result
    return {
      ...data,
      timestamp: new Date().toISOString(),
      location,
    }
  } catch (error) {
    console.error("Error in detectDisease:", error)
    throw error
  }
}
