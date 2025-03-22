"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "What is the primary function of mitochondria in a cell?",
    options: ["Protein synthesis", "Energy production", "Cell division", "Waste removal"],
    correctAnswer: 1,
  },
  {
    id: 2,
    text: "Which of the following is NOT a fundamental force in physics?",
    options: ["Gravity", "Electromagnetic force", "Strong nuclear force", "Centrifugal force"],
    correctAnswer: 3,
  },
  {
    id: 3,
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
  {
    id: 4,
    text: "Which algorithm has the worst time complexity?",
    options: ["Binary search", "Merge sort", "Bubble sort", "Depth-first search"],
    correctAnswer: 2,
  },
  {
    id: 5,
    text: "What is the capital of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2,
  },
]

export default function MockTest() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [testCompleted, setTestCompleted] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(300) // 5 minutes in seconds

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: Number.parseInt(value),
    })
  }

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTestCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let score = 0
    Object.keys(selectedAnswers).forEach((questionIndex) => {
      const index = Number.parseInt(questionIndex)
      if (selectedAnswers[index] === mockQuestions[index].correctAnswer) {
        score++
      }
    })
    return score
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Mock Test</h1>
            <p className="text-gray-400 text-xl mb-8">
              Test your knowledge with our AI-generated mock tests based on your research materials.
            </p>

            {!testCompleted ? (
              <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">
                      Question {currentQuestion + 1} of {mockQuestions.length}
                    </CardTitle>
                    <div className="flex items-center text-white">
                      <Clock className="h-5 w-5 mr-2 text-purple-400" />
                      <span>{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                  <Progress value={((currentQuestion + 1) / mockQuestions.length) * 100} className="h-2 bg-white/10" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-lg text-white font-medium">{mockQuestions[currentQuestion].text}</div>

                  <RadioGroup
                    value={selectedAnswers[currentQuestion]?.toString() || ""}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                  >
                    {mockQuestions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 rounded-lg border border-white/10 p-3 hover:bg-white/5"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-purple-400" />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-white">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="text-white border-purple-500 hover:bg-purple-500/20"
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                    {currentQuestion === mockQuestions.length - 1 ? "Finish Test" : "Next Question"}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-center text-2xl">Test Results</CardTitle>
                  <CardDescription className="text-gray-400 text-center">
                    You scored {calculateScore()} out of {mockQuestions.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-full border-4 border-purple-500 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {Math.round((calculateScore() / mockQuestions.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockQuestions.map((question, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="mr-2 mt-1">
                            {selectedAnswers[index] === question.correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{question.text}</p>
                            <p className="text-gray-400 mt-1">
                              Your answer: {question.options[selectedAnswers[index] || 0]}
                            </p>
                            {selectedAnswers[index] !== question.correctAnswer && (
                              <p className="text-green-400 mt-1">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => setTestCompleted(false)} className="bg-purple-600 hover:bg-purple-700">
                    <FileText className="mr-2 h-5 w-5" />
                    Take Another Test
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

