"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, UserPlus, Mail, Lock, User, Shield, Loader2 } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card } from "@/components/ui/card"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/app/context/auth-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { checkEmailExists } from "@/lib/firebase"
import { userSchema, type UserFormData } from "@/lib/validations/auth"
import { z } from "zod"

const words = [
  {
    text: "Add",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "New User",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function AddUserPage() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "user",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({})

  const validateForm = () => {
    try {
      userSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof UserFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof UserFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission started')
    setErrors({})
    setIsLoading(true)
    console.log('Loading state set to true')

    if (!validateForm()) {
      console.log('Form validation failed')
      setIsLoading(false)
      return
    }
    console.log('Form validation passed')

    try {
      console.log('Checking if email exists:', formData.email)
      const emailExists = await checkEmailExists(formData.email)
      if (emailExists) {
        console.log('Email already exists')
        setErrors({ email: "An account with this email already exists" })
        toast.error("An account with this email already exists")
        setIsLoading(false)
        return
      }
      console.log('Email is available')

      const userData = {
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ").slice(1).join(" "),
        role: formData.role,
        isAuthorized: true,
      }
      console.log('Prepared user data:', userData)

      console.log('Calling signUp function')
      try {
        const result = await signUp(formData.email, formData.password, userData)
        console.log('SignUp completed successfully:', result)
        
        toast.success("User created successfully!")
        console.log('Success toast shown')
        
        setIsLoading(false)
        console.log('Loading state set to false')
        
        console.log('Navigating to users page')
        router.push("/admin/users")
      } catch (signUpError: any) {
        console.error('Detailed signUp error:', {
          code: signUpError.code,
          message: signUpError.message,
          stack: signUpError.stack
        })
        
        // Check if it's a Firestore error
        if (signUpError.message?.includes('Failed to save user data')) {
          toast.error("User created but failed to save additional data. Please try again.")
        } else {
          toast.error(signUpError.message || "Failed to create user")
        }
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error('User creation error:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      })
      toast.error(error.message || "Failed to create user")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <BackgroundBeams />
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/admin/users"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Users
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
          <TypewriterEffect words={words} className="text-2xl sm:text-3xl font-bold" />
        </div>

        <div className="max-w-2xl mx-auto">
          <TracingBeam className="px-4 sm:px-6">
            <Card className="p-6 sm:p-8 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`pl-10 bg-black/50 border-gray-800 text-white ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter full name"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>

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
                      className={`pl-10 bg-black/50 border-gray-800 text-white ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter email address"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <div className="relative flex flex-col">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`pl-10 bg-black/50 border-gray-800 text-white ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-200">
                    User Role
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value as UserFormData['role'] })}
                    >
                      <SelectTrigger className={`pl-10 bg-black/50 border-gray-800 text-white ${errors.role ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">Regular User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-black/50 border-gray-800 text-white hover:bg-gray-900"
                    onClick={() => window.history.back()}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" /> }
                    {isLoading ? "Creating User..." : "Create User"}
                  </Button>
                </div>
              </motion.form>
            </Card>
          </TracingBeam>
        </div>
      </div>
    </div>
  )
} 