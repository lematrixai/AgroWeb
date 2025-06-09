"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Search, UserPlus, MoreVertical, Mail, Phone, Calendar } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card } from "@/components/ui/card"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
const words = [
  {
    text: "User",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Management",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <BackgroundBeams />
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
          <TypewriterEffect words={words} className="text-2xl sm:text-3xl font-bold" />
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-gray-800 text-white"
            />
          </div>
          <Button onClick={() => router.push("/admin/users/add")} className="bg-blue-500 hover:bg-blue-600 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <TracingBeam className="px-4 sm:px-6">
          <Card className="border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {/* Table Rows */}
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-500">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">User {index + 1}</div>
                            <div className="text-xs text-gray-400">ID: {1000 + index}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="h-4 w-4" />
                          user{index + 1}@example.com
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                          {index === 0 ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TracingBeam>
      </div>
    </div>
  )
} 