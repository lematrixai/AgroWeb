"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { detectDisease } from "@/lib/detect-disease"

export default function ImageUploader() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (!selectedFile.type.includes("image/")) {
      setError("Please upload an image file")
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setFile(selectedFile)
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please select an image to upload")
      return
    }

    try {
      setLoading(true)
      setProgress(10)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const result = await detectDisease(file)

      clearInterval(progressInterval)
      setProgress(100)

      // Navigate to results page with the detection result
      router.push(`/results?id=${result.id}`)
    } catch (err) {
      setError("Failed to analyze image. Please try again.")
      console.error("Error detecting disease:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <label
            htmlFor="image"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Upload Maize Leaf Image
          </label>

          {!preview ? (
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("image")?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (max. 5MB)</p>
              <input
                id="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
          ) : (
            <div className="relative border rounded-lg overflow-hidden">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Preview"
                width={400}
                height={300}
                className="w-full h-64 object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveFile}
                disabled={loading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        {loading && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-gray-500">Analyzing image... {progress}%</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={!file || loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            "Detect Disease"
          )}
        </Button>
      </form>
    </div>
  )
}
