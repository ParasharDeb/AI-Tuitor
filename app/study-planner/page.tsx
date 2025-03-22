"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, Plus, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

interface StudyTask {
  id: string
  title: string
  description: string
  date: Date
  duration: number
  priority: "low" | "medium" | "high"
}

export default function StudyPlanner() {
  const [tasks, setTasks] = useState<StudyTask[]>([])
  const [date, setDate] = useState<Date>(new Date())
  const [newTask, setNewTask] = useState<Omit<StudyTask, "id">>({
    title: "",
    description: "",
    date: new Date(),
    duration: 60,
    priority: "medium",
  })

  const handleAddTask = () => {
    const task: StudyTask = {
      ...newTask,
      id: crypto.randomUUID(),
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      date: new Date(),
      duration: 60,
      priority: "medium",
    })
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      (task) =>
        task.date.getDate() === date.getDate() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getFullYear() === date.getFullYear(),
    )
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Study Planner</h1>
            <p className="text-gray-400 text-xl mb-8">
              Create a personalized study schedule to optimize your learning and research.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="border border-white/10 bg-black/50 backdrop-blur-md h-full">
                  <CardHeader>
                    <CardTitle className="text-white">Calendar</CardTitle>
                    <CardDescription className="text-gray-400">Select a date to view or add tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className="text-white"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="tasks">Today's Tasks</TabsTrigger>
                    <TabsTrigger value="add">Add New Task</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tasks">
                    <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="text-white">
                          Tasks for{" "}
                          {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {getTasksForDate(date).length} tasks scheduled
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {getTasksForDate(date).length === 0 ? (
                          <div className="text-center py-12">
                            <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-white text-lg font-medium mb-2">No tasks scheduled</h3>
                            <p className="text-gray-400">Add a new task to start planning your study schedule</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {getTasksForDate(date).map((task) => (
                              <div key={task.id} className="border border-white/10 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-white font-medium">{task.title}</h3>
                                    <p className="text-gray-400 mt-1">{task.description}</p>
                                    <div className="flex items-center mt-2 space-x-4">
                                      <div className="flex items-center text-gray-400">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>{formatDuration(task.duration)}</span>
                                      </div>
                                      <div
                                        className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}
                                      >
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="text-gray-400 hover:text-red-400"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="add">
                    <Card className="border border-white/10 bg-black/50 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="text-white">Add New Study Task</CardTitle>
                        <CardDescription className="text-gray-400">
                          Create a new task for your study schedule
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">
                              Task Title
                            </Label>
                            <Input
                              id="title"
                              placeholder="e.g., Read Chapter 5"
                              value={newTask.title}
                              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              placeholder="Add details about your study task"
                              value={newTask.description}
                              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date" className="text-white">
                                Date
                              </Label>
                              <Input
                                id="date"
                                type="date"
                                value={newTask.date.toISOString().split("T")[0]}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    date: new Date(e.target.value),
                                  })
                                }
                                className="bg-white/10 border-white/20 text-white"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="duration" className="text-white">
                                Duration (minutes)
                              </Label>
                              <Input
                                id="duration"
                                type="number"
                                min="15"
                                step="15"
                                value={newTask.duration}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    duration: Number.parseInt(e.target.value),
                                  })
                                }
                                className="bg-white/10 border-white/20 text-white"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="priority" className="text-white">
                                Priority
                              </Label>
                              <Select
                                value={newTask.priority}
                                onValueChange={(value) =>
                                  setNewTask({
                                    ...newTask,
                                    priority: value as "low" | "medium" | "high",
                                  })
                                }
                              >
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={handleAddTask}
                          disabled={!newTask.title}
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Add Task
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

