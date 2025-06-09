"use server"

import { GoogleGenerativeAI } from '@google/generative-ai';

// Create a Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function chatWithAI(messages: { role: string; content: string }[], disease: string | null, confidence: string | null) {
  try {
    // Get the last message from the user
    const lastMessage = messages[messages.length - 1];
    
    // Create a system prompt based on the disease detection
    const systemPrompt = `You are an agricultural expert assistant. The user has uploaded an image of a corn plant that was analyzed for diseases. 
    The analysis shows: ${disease} with ${confidence}% confidence.
    Provide detailed information about this condition, including:
    1. What it means for the plant
    2. Common causes
    3. Recommended treatments
    4. Prevention methods
    5. Any other relevant information
    
    Be conversational but professional. If the user asks follow-up questions, provide specific and helpful answers.`;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: 'system',
          parts: [{ text: systemPrompt }],
        },
        ...messages.map((message) => ({
          role: message.role,
          parts: [{ text: message.content }],
        })),
      ],
    });

    // Generate a response
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return { content: text };
  } catch (error) {
    console.error('Chat Error:', error);
    throw new Error('Failed to process chat request');
  }
} 