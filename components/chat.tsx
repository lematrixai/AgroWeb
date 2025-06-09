"use client"

import { useChat } from 'ai/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system' | 'data'
  content: string
}

export default function Chat() {
  const searchParams = useSearchParams()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const disease = searchParams.get('disease')
  const confidence = searchParams.get('confidence')
  const initialMessage = searchParams.get('message')

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      disease,
      confidence,
    },
    initialMessages: initialMessage ? [
      {
        id: 'initial',
        role: 'assistant',
        content: initialMessage
      }
    ] : []
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-black/40">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message: Message) => (
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
                  "rounded-2xl p-4 shadow-lg backdrop-blur-sm max-w-[85%]",
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 border border-blue-500/20 text-white"
                )}
              >
                <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
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
          onSubmit={handleSubmit}
          className="flex gap-2"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
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