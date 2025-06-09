"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Save, RefreshCw, Shield } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card } from "@/components/ui/card"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const words = [
  {
    text: "System",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Settings",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function SettingsPage() {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <TracingBeam className="px-4 sm:px-6">
            <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-white">General Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      defaultValue="Agricultural AI Assistant"
                      className="bg-black/50 border-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      defaultValue="AI-powered agricultural assistant for plant disease detection"
                      className="bg-black/50 border-gray-800 text-white"
                    />
                  </div>
                </div>
              </motion.div>
            </Card>
          </TracingBeam>

          {/* Security Settings */}
          <TracingBeam className="px-4 sm:px-6">
            <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <Switch id="twoFactor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      defaultValue="30"
                      className="w-24 bg-black/50 border-gray-800 text-white"
                    />
                  </div>
                </div>
              </motion.div>
            </Card>
          </TracingBeam>

          {/* System Maintenance */}
          <TracingBeam className="px-4 sm:px-6">
            <Card className="p-4 sm:p-6 border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-white">System Maintenance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <Switch id="maintenanceMode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupFrequency">Backup Frequency (hours)</Label>
                    <Input
                      id="backupFrequency"
                      type="number"
                      defaultValue="24"
                      className="w-24 bg-black/50 border-gray-800 text-white"
                    />
                  </div>
                </div>
              </motion.div>
            </Card>
          </TracingBeam>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            variant="outline"
            className="bg-black/50 border-gray-800 text-white hover:bg-gray-900"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
} 