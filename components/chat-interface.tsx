"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDetectionResult } from "@/lib/results"
import { cn } from "@/lib/utils"

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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load initial message based on detection result
  useEffect(() => {
    const loadInitialMessage = async () => {
      if (resultId) {
        setIsLoading(true)
        try {
          const result = await getDetectionResult(resultId)
          if (result) {
            let initialMessage = "Hello! I'm your agricultural assistant. How can I help you today?"

            if (result.status === "healthy") {
              initialMessage =
                "Good news! Your maize plant appears healthy. How can I help you maintain your crop health?"
            } else if (result.status === "msv") {
              initialMessage =
                "I see your maize has been diagnosed with Maize Streak Virus (MSV). I can provide information about treatment and prevention. What would you like to know?"
            } else if (result.status === "mln") {
              initialMessage =
                "Your maize has been diagnosed with Maize Lethal Necrosis (MLN), which requires immediate attention. I can help with management strategies. What specific information do you need?"
            }

            setMessages([
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: initialMessage,
                timestamp: new Date(),
              },
            ])
          }
        } catch (error) {
          console.error("Error loading detection result:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        // Default welcome message
        setMessages([
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Hello! I'm your agricultural assistant. How can I help you today?",
            timestamp: new Date(),
          },
        ])
      }
    }

    loadInitialMessage()
  }, [resultId])

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

    try {
      // In a real application, you would send the message to an API endpoint
      // that would process it with an AI model like GPT-4 or Claude

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock responses based on user input
      let responseContent = ""
      const userInput = input.toLowerCase()

      if (userInput.includes("treatment") && userInput.includes("msv")) {
        responseContent =
          "For Maize Streak Virus (MSV) treatment:\n\n1. Remove and destroy infected plants to prevent spread\n2. Control leafhopper populations with appropriate insecticides\n3. Plant MSV-resistant varieties in future seasons\n4. Maintain weed-free fields to reduce leafhopper habitat\n5. Consider crop rotation with non-host crops"
      } else if (userInput.includes("treatment") && userInput.includes("mln")) {
        responseContent =
          "For Maize Lethal Necrosis (MLN) treatment:\n\n1. Unfortunately, there is no cure for infected plants\n2. Remove and destroy all infected plants immediately\n3. Implement strict field sanitation measures\n4. Control insect vectors with appropriate insecticides\n5. Practice crop rotation with non-cereal crops for at least 2 seasons\n6. Use certified disease-free seeds for future planting"
      } else if (userInput.includes("prevent") || userInput.includes("prevention")) {
        responseContent =
          "To prevent maize diseases:\n\n1. Use certified disease-free seeds\n2. Practice crop rotation\n3. Maintain proper field sanitation\n4. Control insect vectors\n5. Plant disease-resistant varieties when available\n6. Ensure proper spacing between plants for good air circulation\n7. Monitor your crops regularly for early detection"
      } else if (userInput.includes("fertilizer") || userInput.includes("nutrient")) {
        responseContent =
          "For maize fertilization:\n\n1. Conduct soil testing to determine nutrient needs\n2. Apply base fertilizer before planting (NPK)\n3. Top-dress with nitrogen when plants are knee-high\n4. Consider micronutrients like zinc and boron if deficient\n5. Organic options include well-decomposed manure and compost\n6. Follow local agricultural extension recommendations for your specific region"
      } else {
        responseContent =
          "Thank you for your question. As an agricultural assistant, I can help with information about maize diseases, prevention, treatment options, and general farming practices. Could you provide more specific details about what you'd like to know?"
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
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
                "flex items-start gap-3 max-w-[85%]",
                message.role === "user" ? "ml-auto" : ""
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border-2 border-blue-500/20">
                  <AvatarImage src="/bot-avatar.png" alt="AI" />
                  <AvatarFallback className="bg-blue-500/10">
                    <Bot className="h-4 w-4 text-blue-500" />
                  </AvatarFallback>
                </Avatar>
              )}

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={cn(
                  "rounded-2xl p-4 shadow-lg backdrop-blur-sm",
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 border border-blue-500/20 text-white"
                )}
              >
                <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                <div className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 border-2 border-blue-500/20">
                  <AvatarImage src="/user-avatar.png" alt="User" />
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
              <AvatarImage src="/bot-avatar.png" alt="AI" />
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
