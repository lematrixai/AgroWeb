"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, LogIn, Mail, Lock, AlertCircle } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card } from "@/components/ui/card"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
const words = [
  {
    text: "Admin",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Login",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showContactDialog, setShowContactDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <BackgroundBeams />
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
          <TypewriterEffect words={words} className="text-2xl sm:text-3xl font-bold" />
        </div>

        <div className="max-w-md mx-auto">
          <TracingBeam className="px-4 sm:px-6">
            <Card className="p-6 sm:p-8 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 bg-black/50 border-gray-800 text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 bg-black/50 border-gray-800 text-white"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <Link href="#" className="text-sm text-blue-500 hover:text-blue-400">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>

                <div className="text-center text-sm text-gray-400">
                  Need help?{" "}
                  <button
                    type="button"
                    onClick={() => setShowContactDialog(true)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Contact support
                  </button>
                </div>
              </motion.form>
            </Card>
          </TracingBeam>
        </div>
      </div>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[425px] bg-black/40 backdrop-blur-xl border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              Contact Support
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              For admin access, please contact your system administrator or send an email to admin@agroweb.com
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
} 