'use client'

import type React from "react"
import { Inter } from "next/font/google"
import { AnimatePresence } from "framer-motion"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-white antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </body>
    </html>
  )
}
