"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileVideo, Upload, Video } from "lucide-react"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

export default function AIVideoGenerator() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">AI Video Generator</h1>
            <p className="text-gray-400 text-xl mb-8">
              Transform your research papers into engaging educational videos with our AI-powered video generator.
            </p>

            <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Create a Video</CardTitle>
                <CardDescription className="text-gray-400">
                  Generate videos from text prompts or upload your research paper
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="prompt" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="prompt">Text Prompt</TabsTrigger>
                    <TabsTrigger value="upload">Upload Paper</TabsTrigger>
                  </TabsList>

                  <TabsContent value="prompt" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt" className="text-white">
                        Enter your prompt
                      </Label>
                      <Textarea
                        id="prompt"
                        placeholder="Describe the video you want to create. For example: Create a video explaining quantum computing principles for undergraduate students."
                        className="h-32 bg-white/10 border-white/20 text-white"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-white text-lg font-medium mb-2">Upload your research paper</h3>
                      <p className="text-gray-400 mb-4">PDF, DOCX, or TXT files up to 10MB</p>

                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
                          Choose File
                        </Button>
                      </Label>

                      {uploadedFile && <p className="mt-4 text-purple-400">Selected: {uploadedFile.name}</p>}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  <FileVideo className="mr-2 h-5 w-5" />
                  {isGenerating ? "Generating Video..." : "Generate Video"}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">1. Upload or Enter Prompt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">
                      Upload your research paper or enter a detailed text prompt describing the video you want to
                      create.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <Video className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">2. AI Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">
                      Our AI analyzes your content, extracts key concepts, and generates a storyboard for your video.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <FileVideo className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">3. Download Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">
                      Review and download your AI-generated video, ready to share with students or colleagues.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

