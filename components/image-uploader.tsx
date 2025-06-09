"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, Image as ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
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
  })

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
  }

  const handleUpload = async () => {
    if (!file) return

    // In a real application, you would upload the file to your server here
    console.log("Uploading file:", file)
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
                  or click to select a file
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleUpload}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </motion.div>
      )}
    </div>
  )
}
