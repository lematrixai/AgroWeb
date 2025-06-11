import { NextResponse } from 'next/server'
import { chatWithAI } from '@/lib/action/action.chat'

export async function POST(req: Request) {
  try {
    const { messages, disease, confidence } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    try {
      const response = await chatWithAI(messages, disease, confidence)
      return NextResponse.json(response)
    } catch (error: any) {
      console.error('Chat API Error:', error)
      
      // Check for rate limit error
      if (error.message?.includes('currently busy') || 
          error.message?.includes('try again in')) {
        // Extract retry delay from error message
        const retryDelay = error.message.match(/\d+/)?.[0] || '30'
        
        return NextResponse.json(
          { error: error.message },
          { 
            status: 429,
            headers: {
              'Retry-After': retryDelay,
              'Cache-Control': 'no-store'
            }
          }
        )
      }

      return NextResponse.json(
        { error: error.message || 'Failed to generate response. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Request Error:', error)
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
} 