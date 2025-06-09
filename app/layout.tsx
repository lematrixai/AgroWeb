
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BackgroundBeams } from "@/components/ui/background-beams"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgroWeb - AI Agricultural Assistant",
  description: "Your intelligent agricultural assistant powered by AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <BackgroundBeams />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
