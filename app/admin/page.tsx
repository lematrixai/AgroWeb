"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Users, Settings, Database } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card } from "@/components/ui/card"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { motion } from "framer-motion"

const words = [
  {
    text: "Admin",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Dashboard",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function AdminPage() {
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

        {/* Main Content Section */}
        <div className="space-y-8 mb-16">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">Total Users</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-500">1,234</p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </TracingBeam>

            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Database className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">Total Scans</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-500">5,678</p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </TracingBeam>

            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">System Status</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-green-500">Active</p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </TracingBeam>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">User Management</h2>
                  <p className="text-sm sm:text-base text-gray-400">
                    Manage user accounts, permissions, and access levels.
                  </p>
                  <Link
                    href="/admin/users"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </motion.div>
              </Card>
            </TracingBeam>

            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">System Settings</h2>
                  <p className="text-sm sm:text-base text-gray-400">
                    Configure system parameters and manage application settings.
                  </p>
                  <Link
                    href="/admin/settings"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Link>
                </motion.div>
              </Card>
            </TracingBeam>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-16 border-t border-gray-800 pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Recent Activity</h2>
          <div className="grid grid-cols-1 gap-6">
            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">New User Registration</h3>
                        <p className="text-sm text-gray-400">John Doe registered a new account</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">2 minutes ago</span>
                  </div>
                </motion.div>
              </Card>
            </TracingBeam>

            <TracingBeam className="px-4 sm:px-6">
              <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">New Scan Completed</h3>
                        <p className="text-sm text-gray-400">Plant disease detection completed</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">5 minutes ago</span>
                  </div>
                </motion.div>
              </Card>
            </TracingBeam>
          </div>
        </div>
      </div>
    </div>
  )
}
