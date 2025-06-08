'use client'

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Maize Disease Detection
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Advanced AI detection for Maize Streak Virus (MSV) and Maize Lethal Necrosis (MLN)
                </p>
              </div>

              <div className="mx-auto max-w-3xl space-y-12">
                {/* Mission Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <p className="text-gray-500">
                    We are dedicated to helping farmers protect their maize crops through early detection of Maize Streak Virus (MSV) 
                    and Maize Lethal Necrosis (MLN). Our AI-powered platform provides quick and accurate disease identification, 
                    helping farmers take timely action to protect their crops.
                  </p>
                </motion.section>

                {/* How It Works Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">How It Works</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "1. Upload",
                        description: "Take a clear photo of your maize leaf showing any symptoms or discoloration."
                      },
                      {
                        title: "2. Analysis",
                        description: "Our AI model analyzes the image to detect signs of MSV or MLN infection."
                      },
                      {
                        title: "3. Results",
                        description: "Get instant results indicating whether your maize is healthy or infected with MSV or MLN."
                      },
                      {
                        title: "4. Recommendations",
                        description: "Receive specific treatment recommendations based on the detected disease."
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full bg-green-50/50">
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-500">{step.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Technology Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">Diseases We Detect</h2>
                  <p className="text-gray-500">
                    Our platform uses advanced machine learning algorithms trained on thousands of maize leaf images to detect:
                  </p>
                  <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="list-disc list-inside text-gray-500 space-y-2"
                  >
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Maize Streak Virus (MSV) - Characterized by yellow streaks on leaves
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Maize Lethal Necrosis (MLN) - Shows chlorotic mottling and necrosis
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Healthy Maize - Confirms your crop is disease-free
                    </motion.li>
                  </motion.ul>
                </motion.section>

                {/* Contact Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">Get in Touch</h2>
                  <p className="text-gray-500">
                    Have questions about MSV or MLN detection? We'd love to hear from you. Contact us through our 
                    <Link href="#" className="text-green-600 hover:underline ml-1">
                      contact page
                    </Link>.
                  </p>
                </motion.section>

                {/* Footer */}
                <div className="border-t pt-8 text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    © 2025 Maize Disease Detection. All rights reserved.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href="#" className="text-sm text-gray-500 hover:underline">
                      Terms
                    </Link>
                    <Link href="#" className="text-sm text-gray-500 hover:underline">
                      Privacy
                    </Link>
                    <Link href="#" className="text-sm text-gray-500 hover:underline">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 