"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, Image as ImageIcon, X, Loader2, MessageSquare, AlertCircle, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { detectDisease } from "@/lib/action/action.detect"
import { useRouter } from "next/navigation"

interface PredictionResult {
  error?: boolean;
  predictions: Array<{
    label: string;
    score: number;
  }>;
  topPrediction: {
    label: string;
    confidence: string;
  };
  message: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size must be less than 5MB")
        return
      }
      setError(null)
      setFile(selectedFile)
      setPrediction(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  })

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    setPrediction(null)
    setError(null)
  }

  const handleUpload = async () => {
    try {
      if (!file) return
      setLoading(true)
      setError(null)
      const result = await detectDisease(file)
      console.log("Result:", result)
      setPrediction(result)
    } catch (error) {
      console.error("Error uploading file:", error)
      let errorMessage = "Failed to analyze image. Please try again."
      
      if (error instanceof Error) {
        if (error.message.includes("413") || error.message.includes("Body exceeded")) {
          errorMessage = "Image size is too large. Please try a smaller image (max 5MB)."
        } else if (error.message.includes("timeout")) {
          errorMessage = "Request timed out. Please try again."
        } else if (error.message.includes("404")) {
          errorMessage = "Service temporarily unavailable. Please try again later."
        }
      }
      
      setError(errorMessage)
      setPrediction({
        error: true,
        message: errorMessage,
        predictions: [],
        topPrediction: {
          label: "Error",
          confidence: "0"
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChat = () => {
    if (!prediction) return;
    
    const searchParams = new URLSearchParams({
      message: prediction.message,
      disease: prediction.topPrediction.label,
      confidence: prediction.topPrediction.confidence
    });
    
    router.push(`/chat?${searchParams.toString()}`);
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-700 hover:border-blue-500/50"
        )}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 text-center"
        >
          {preview ? (
            <div className="relative w-full max-w-md">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-blue-500/10 p-4">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-white">
                  {isDragActive ? "Drop your image here" : "Drag & drop your image here"}
                </p>
                <p className="text-sm text-gray-400">
                  or click to select a file (max 5MB)
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-red-500/20 bg-red-500/10"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-white">{error}</p>
          </div>
        </motion.div>
      )}

      {file && !prediction && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 
            <ImageIcon className="h-4 w-4 mr-2" />}
            {loading ? "Analyzing..." : "Analyze Image"}
          </Button>
        </motion.div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/10"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="h-6 w-6 text-blue-500 animate-bounce" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm animate-ping" />
            </div>
            <div className="space-y-1">
              <p className="text-white font-medium">AI is analyzing your image...</p>
              <p className="text-sm text-gray-400">This may take a few moments</p>
            </div>
          </div>
        </motion.div>
      )}

      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-xl border",
            prediction.error 
              ? "bg-red-500/10 border-red-500/20" 
              : "bg-green-500/10 border-green-500/20"
          )}
        >
          <div className="flex items-start gap-3">
            {prediction.error ? (
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            ) : (
              <MessageSquare className="h-5 w-5 text-green-500 mt-0.5" />
            )}
            <div className="space-y-2">
              <p className="text-white">{prediction.message}</p>
              {!prediction.error && (
                <Button
                  onClick={handleChat}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat with AI Assistant
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
