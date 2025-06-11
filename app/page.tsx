'use client'

import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Upload, Brain, Leaf, Sparkles, MessageSquare, ListChecks, LogIn, LogOut, Shield, User } from "lucide-react"
import { motion } from "framer-motion"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageUploader from "@/components/image-uploader"
import LoadingSkeleton from "@/components/loading-skeleton"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { useAuth } from "@/app/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const words = [
  {
    text: "AI",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Agricultural",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Assistant",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function Home() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <BackgroundBeams />
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
            <TypewriterEffect words={words} className="text-2xl sm:text-3xl font-bold" />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} alt={user.email || ''} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {user.email ? getInitials(user.email) : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border border-gray-800" align="end">
                  <DropdownMenuLabel className="text-gray-400">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  {/* @ts-ignore - user.role exists but TypeScript doesn't know about it */}
                  {user.role === 'administrator' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-gray-800"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="space-y-8 mb-16">
          {/* Upload Section */}
          <TracingBeam className="px-4 sm:px-6">
            <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Upload Your Plant Image</h2>
                <p className="text-sm sm:text-base text-gray-400">
                  Upload a clear image of your plant's leaves for disease detection and treatment recommendations.
                </p>
                <ImageUploader />
              </motion.div>
            </Card>
          </TracingBeam>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Get Expert Guidance</h2>
                  <p className="text-sm sm:text-base text-gray-400">
                    Chat with our AI assistant to get personalized advice and treatment recommendations.
                  </p>
                  <Link
                    href="/chat"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chat
                  </Link>
                </motion.div>
              </Card>
            </TracingBeam>

            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">View Results</h2>
                  <p className="text-sm sm:text-base text-gray-400">
                    Check your previous detection results and treatment recommendations.
                  </p>
                  <Link
                    href="/results"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    View Results
                  </Link>
                </motion.div>
              </Card>
            </TracingBeam>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 border-t border-gray-800 pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Easy Upload</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Simply upload a photo of your plant's leaves for instant analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Advanced AI</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Our AI model provides accurate disease detection and treatment recommendations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Plant Health</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Get expert guidance to keep your plants healthy and thriving.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
