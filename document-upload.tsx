"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DocumentUploaderProps {
  documentType: string
  label: string
  onUpload: (data: string) => void
  isUploaded: boolean
}

export function DocumentUploader({ documentType, label, onUpload, isUploaded }: DocumentUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)

      // Simulate document processing
      setTimeout(() => {
        setIsUploading(false)
        onUpload(reader.result as string)
      }, 2000)
    }
    reader.readAsDataURL(file)
  }

  // Handle camera capture
  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card className={isUploaded ? "border-green-500" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
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
                className="h-5 w-5 text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{label}</h3>
              {isUploaded ? (
                <p className="text-sm text-green-600">Document uploaded successfully</p>
              ) : (
                <p className="text-sm text-muted-foreground">Upload or take a photo</p>
              )}
            </div>
          </div>

          {!isUploaded && !isUploading && (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCameraCapture}>
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
                  className="h-4 w-4 mr-2"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Capture
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {isUploading && (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm">Processing...</span>
            </div>
          )}

          {isUploaded && (
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
              className="h-6 w-6 text-green-600"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </div>

        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt={`${documentType} preview`}
              className="max-h-40 rounded-md mx-auto"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
