"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Upload, User } from "lucide-react"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function DoubtSolver() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI research assistant. How can I help with your academic questions today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on recent research, the answer to your question involves several key factors...",
        "That's an interesting question! According to the literature, there are multiple perspectives...",
        "I found several relevant studies that address this topic. The consensus appears to be...",
        "This is a complex topic. Let me break it down for you based on the latest research...",
        "Great question! From an academic perspective, we should consider the following points...",
      ]

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
            <h1 className="text-4xl font-bold text-white mb-6">Doubt Solver</h1>
            <p className="text-gray-400 text-xl mb-8">
              Get instant answers to your academic questions from our AI research assistant.
            </p>

            <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Research Assistant Chat</CardTitle>
                <CardDescription className="text-gray-400">
                  Ask any question related to your research or studies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[60vh] overflow-y-auto space-y-4 mb-4 p-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                          {message.role === "assistant" ? (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback className="bg-purple-600">
                                <Bot className="h-4 w-4 text-white" />
                              </AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback className="bg-blue-600">
                                <User className="h-4 w-4 text-white" />
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-white"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-200" : "text-gray-400"}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] flex-row">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-purple-600">
                            <Bot className="h-4 w-4 text-white" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-white/10 text-white">
                          <div className="flex space-x-2">
                            <div
                              className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
                              style={{ animationDelay: "600ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-end space-x-2">
                  <Button variant="outline" size="icon" className="text-white border-white/20 hover:bg-white/10">
                    <Upload className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder="Ask your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-white/10 border-white/20 text-white min-h-[80px]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

