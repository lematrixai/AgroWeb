import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert the file to a buffer
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // In a real application, you would send this to Hugging Face
    // For now, we'll simulate a response

    // Create a new FormData to send to Hugging Face
    const huggingFaceFormData = new FormData()
    huggingFaceFormData.append("file", new Blob([buffer]), image.name)

    // Uncomment this in a real application
    /*
    const huggingFaceResponse = await fetch(
      'https://api-inference.huggingface.co/models/your-model-id',
      {
        method: 'POST',
        body: huggingFaceFormData,
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );
    
    if (!huggingFaceResponse.ok) {
      throw new Error('Failed to get prediction from Hugging Face');
    }
    
    const prediction = await huggingFaceResponse.json();
    */

    // Simulate a response for demonstration
    // In a real app, you would use the actual prediction from Hugging Face
    const diseases = ["healthy", "msv", "mln"]
    const randomIndex = Math.floor(Math.random() * diseases.length)
    const status = diseases[randomIndex]

    // Generate a random confidence score between 0.7 and 0.99
    const confidence = 0.7 + Math.random() * 0.29

    return NextResponse.json({
      id: crypto.randomUUID(),
      status,
      confidence: Number.parseFloat(confidence.toFixed(2)),
    })
  } catch (error) {
    console.error("Error in disease detection:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
