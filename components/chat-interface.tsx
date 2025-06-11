"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDetectionResult } from "@/lib/results"
import { chatWithAI } from "@/lib/action/action.chat"
import { cn } from "@/lib/utils"
import { FormattedText } from "./formatted-text"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatInterface({ resultId }: { resultId?: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  // Load initial message based on detection result or URL parameters
  useEffect(() => {
    const loadInitialMessage = async () => {
      const disease = searchParams.get('disease')
      const confidence = searchParams.get('confidence')
      const initialMessage = searchParams.get('message')

      if (disease && confidence && initialMessage) {
        // Handle prediction-based chat
        let message = ""
        if (disease.toLowerCase() === "healthy") {
          message = `🌱 Good news! Your maize plant appears healthy (${confidence}% confidence).

🔍 What This Means
• Your plant is showing no signs of disease
• The leaves and overall structure appear normal

💡 Recommendations
• Continue regular monitoring
• Maintain proper watering and fertilization
• Watch for any changes in plant appearance

Would you like specific tips for maintaining healthy maize plants?`
        } else if (disease.toLowerCase() === "msv") {
          message = `🔍 I've analyzed your maize plant and detected Maize Streak Virus (MSV) with ${confidence}% confidence.

⚠️ What This Means
• MSV is a viral disease that affects maize plants
• It can cause yellow streaks on leaves
• May lead to stunted growth and reduced yield

💊 Recommended Actions
• Remove and destroy infected plants
• Control vector populations (leafhoppers)
• Use resistant varieties for future planting

Would you like detailed information about any of these aspects?`
        } else if (disease.toLowerCase() === "mln") {
          message = `⚠️ Urgent: Your maize has been diagnosed with Maize Lethal Necrosis (MLN) with ${confidence}% confidence.

🔍 What This Means
• MLN is a serious viral disease
• Can cause complete crop loss
• Requires immediate attention

💊 Immediate Actions Needed
• Isolate affected plants
• Remove and destroy infected plants
• Implement strict field sanitation

Would you like specific guidance on managing this situation?`
        }

        setMessages([
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: message,
            timestamp: new Date(),
          },
        ])
      } else if (resultId) {
        // Handle result ID based chat
        setIsLoading(true)
        setError(null)
        try {
          const result = await getDetectionResult(resultId)
          if (result) {
            let message = ""
            if (result.status === "healthy") {
              message = `🌱 Good news! Your maize plant appears healthy.

🔍 What This Means
• Your plant is showing no signs of disease
• The leaves and overall structure appear normal

💡 Recommendations
• Continue regular monitoring
• Maintain proper watering and fertilization
• Watch for any changes in plant appearance

Would you like specific tips for maintaining healthy maize plants?`
            } else if (result.status === "msv") {
              message = `🔍 I've analyzed your maize plant and detected Maize Streak Virus (MSV).

⚠️ What This Means
• MSV is a viral disease that affects maize plants
• It can cause yellow streaks on leaves
• May lead to stunted growth and reduced yield

💊 Recommended Actions
• Remove and destroy infected plants
• Control vector populations (leafhoppers)
• Use resistant varieties for future planting

Would you like detailed information about any of these aspects?`
            } else if (result.status === "mln") {
              message = `⚠️ Urgent: Your maize has been diagnosed with Maize Lethal Necrosis (MLN).

🔍 What This Means
• MLN is a serious viral disease
• Can cause complete crop loss
• Requires immediate attention

💊 Immediate Actions Needed
• Isolate affected plants
• Remove and destroy infected plants
• Implement strict field sanitation

Would you like specific guidance on managing this situation?`
            }

            setMessages([
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: message,
                timestamp: new Date(),
              },
            ])
          }
        } catch (error) {
          console.error("Error loading detection result:", error)
          setError("Failed to load initial message. Please try refreshing the page.")
        } finally {
          setIsLoading(false)
        }
      } else {
        // Default welcome message for new chat
        setMessages([
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "👋 Hi! I'm your maize disease assistant. I can help you with:\n• Maize Streak Virus (MSV)\n• Maize Lethal Necrosis (MLN)\n• General maize health issues\n\nWhat would you like to know about your maize plants?",
            timestamp: new Date(),
          },
        ])
      }
    }

    loadInitialMessage()
  }, [resultId, searchParams])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const result = await getDetectionResult(resultId || "")
      
      // Use try-catch for the Server Action
      try {
        const response = await chatWithAI(
          [...messages, userMessage],
          result?.status || null,
          result?.confidence?.toString() || null
        )

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.content,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (actionError: any) {
        // Handle Server Action error
        console.error("Server Action Error:", actionError)
        
        // Add error message to chat
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: actionError.message,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, errorMessage])
        setError(actionError.message)
      }
    } catch (error: any) {
      console.error("Error getting detection result:", error)
      setError("Failed to get detection result. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-black/40">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border-2 border-blue-500/20">
                  <AvatarImage src="/bot-avatar.svg" alt="AI" />
                  <AvatarFallback className="bg-blue-500/10">
                    <Bot className="h-4 w-4 text-blue-500" />
                  </AvatarFallback>
                </Avatar>
              )}

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={cn(
                  "rounded-2xl p-4 shadow-lg backdrop-blur-sm max-w-[85%]",
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 border border-blue-500/20 text-white"
                )}
              >
                <div className="flex-1 space-y-2 overflow-hidden px-1">
                  <FormattedText content={message.content} />
                </div>
                <div className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 border-2 border-blue-500/20">
                  <AvatarImage src="/user-avatar.svg" alt="User" />
                  <AvatarFallback className="bg-blue-500/10">
                    <User className="h-4 w-4 text-blue-500" />
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Avatar className="h-8 w-8 border-2 border-blue-500/20">
              <AvatarImage src="/bot-avatar.svg" alt="AI" />
              <AvatarFallback className="bg-blue-500/10">
                <Bot className="h-4 w-4 text-blue-500" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-white/10 rounded-2xl p-4 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-blue-500/20 p-4 bg-black/40 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about agriculture..."
            className="min-h-[50px] resize-none rounded-xl border-blue-500/20 bg-white/5 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
