'use client'

import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Upload } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageUploader from "@/components/image-uploader"
import LoadingSkeleton from "@/components/loading-skeleton"

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex flex-col min-h-screen">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={staggerContainer}
        >
            <CardContent className="p-0">
              {/* Hero Section */}
              <motion.section 
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gradient-to-b from-green-50 to-white py-12 md:py-24 rounded-t-3xl"
              >
                <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <motion.div 
                      variants={itemAnimation}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="space-y-2"
                    >
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                        Maize Disease Detection
                      </h1>
                      <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                        Upload a photo of your maize leaf and get instant disease detection results using AI technology.
                      </p>
                    </motion.div>
                    <motion.div 
                      variants={itemAnimation}
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                      className="space-x-4"
                    >
                      <Button asChild>
                        <a href="#upload-section" className="bg-green-600 text-white hover:bg-green-600">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild className="border-2 border-green-600">
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* Upload Section */}
              <motion.section 
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                id="upload-section" 
                className="py-12 md:py-24"
              >
                <div className="container px-4 md:px-6">
                  <motion.div 
                    variants={staggerContainer}
                    className="mx-auto max-w-2xl space-y-8"
                  >
                    <motion.div 
                      variants={itemAnimation}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="space-y-2 text-center"
                    >
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Upload Your Maize Leaf Image</h2>
                      <p className="text-gray-500 md:text-lg">
                        Our AI will analyze your image and detect if your maize is healthy or affected by common diseases.
                      </p>
                    </motion.div>

                    <motion.div
                      variants={itemAnimation}
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <Suspense fallback={<LoadingSkeleton />}>
                            <ImageUploader />
                          </Suspense>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Features Section */}
              <motion.section 
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gray-50 py-12 md:py-24"
              >
                <div className="container px-4 md:px-6">
                  <motion.div 
                    variants={staggerContainer}
                    className="grid gap-6 md:grid-cols-3"
                  >
                    {[
                      {
                        icon: <Upload className="h-6 w-6 text-green-600" />,
                        bgColor: "bg-green-100",
                        title: "Easy Upload",
                        description: "Simply upload a photo of your maize leaf and get instant results."
                      },
                      {
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M9 15v-2" />
                            <path d="M12 15v-6" />
                            <path d="M15 15v-4" />
                          </svg>
                        ),
                        bgColor: "bg-blue-100",
                        title: "Detailed Analysis",
                        description: "Get detailed information about the detected disease and treatment options."
                      },
                      {
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-purple-600"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        ),
                        bgColor: "bg-purple-100",
                        title: "AI Chatbot",
                        description: "Chat with our AI assistant for personalized advice and recommendations."
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        variants={itemAnimation}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                            <div className={`rounded-full ${feature.bgColor} p-3`}>
                              {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-gray-500">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.section>

              {/* Footer */}
              <motion.footer 
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="border-t bg-white py-6 md:py-8"
              >
                <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-gray-500 md:text-left">
                      © 2025 Maize Disease Detection. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                      <Link href="/terms" className="text-sm text-gray-500 hover:underline">
                        Terms
                      </Link>
                      <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
                        Privacy
                      </Link>
                      <Link href="/contact" className="text-sm text-gray-500 hover:underline">
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.footer>
            </CardContent>
        </motion.div>
      </div>
    </div>
  )
}
