import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { Separator } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import {
  Atom,
  BookOpen,
  Bot,
  Brain,
  Calculator,
  FileImage,
  FileText,
  FlaskConical,
  ImageIcon,
  Lightbulb,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "equation" | "flowchart";
}

interface AssistantFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  prompt: string;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features: AssistantFeature[] = [
    {
      id: "explain",
      title: "Concept Explainer",
      description: "Get clear explanations of chemistry concepts with examples",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-500",
      prompt: "Explain this chemistry concept in simple terms with examples:",
    },
    {
      id: "equation",
      title: "Equation Balancer",
      description: "Balance chemical equations and understand the process",
      icon: <Calculator className="h-5 w-5" />,
      color: "bg-green-500",
      prompt: "Help me balance this chemical equation and explain the steps:",
    },
    {
      id: "flowchart",
      title: "Process Flowchart",
      description: "Create step-by-step flowcharts for chemical processes",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-purple-500",
      prompt: "Create a step-by-step flowchart for this chemical process:",
    },
    {
      id: "problem",
      title: "Problem Solver",
      description: "Solve chemistry problems with detailed explanations",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-red-500",
      prompt: "Help me solve this chemistry problem step by step:",
    },
    {
      id: "safety",
      title: "Safety Guide",
      description: "Learn about chemical safety and lab procedures",
      icon: <FlaskConical className="h-5 w-5" />,
      color: "bg-orange-500",
      prompt: "Explain the safety considerations for:",
    },
    {
      id: "explore",
      title: "Chemistry Explorer",
      description: "Discover interesting facts and applications",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "bg-teal-500",
      prompt: "Tell me interesting facts and real-world applications about:",
    },
  ];

  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/ai-assistant", {
        question,
      });
      return response.json();
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: data.response,
        sender: "ai",
        timestamp: new Date(),
        type: data.type || "text",
      };
      setMessages((prev) => [...prev, aiMessage]);
    },
    onError: () => {
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content:
          "Sorry, I'm having trouble responding right now. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const finalQuestion = selectedFeature
      ? `${
          features.find((f) => f.id === selectedFeature)?.prompt
        } ${inputValue}`
      : inputValue;

    const userMessage: Message = {
      id: Date.now().toString() + "-user",
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate(finalQuestion);
    setInputValue("");
    setSelectedFeature(null);
  };

  const handleFeatureSelect = (feature: AssistantFeature) => {
    setSelectedFeature(feature.id);
    setInputValue("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const userMessage: Message = {
          id: Date.now().toString() + "-user",
          content: `I've uploaded an image: ${file.name}. Please analyze this chemistry-related image and provide detailed explanations.`,
          sender: "user",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);

        setTimeout(() => {
          const aiMessage: Message = {
            id: Date.now().toString() + "-ai",
            content: `I can see you've uploaded "${file.name}". While I can't process images directly in this demo, I can help you with:\n\n• Describing chemical structures you see\n• Explaining reaction mechanisms\n• Solving chemistry problems from the image\n• Balancing equations\n\nPlease describe what you see in the image, and I'll provide detailed explanations!`,
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString() + "-user",
        content: `I've uploaded a file: ${file.name}. Please help me with the chemistry problems or content in this file.`,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now().toString() + "-ai",
          content: `I can see you've uploaded "${file.name}". While I can't directly read files in this demo, I can help you with:\n\n• Solving chemistry homework problems\n• Explaining concepts from your textbook\n• Balancing chemical equations\n• Understanding reaction mechanisms\n• Laboratory procedures and safety\n\nPlease type or describe the specific problems you need help with, and I'll provide step-by-step solutions!`,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickStartQuestions = [
    "What is the difference between ionic and covalent bonds?",
    "How do I balance the equation: H₂ + O₂ → H₂O?",
    "Explain the process of photosynthesis in chemistry terms",
    "What are the safety rules for handling acids?",
    "Show me the electron configuration of carbon",
  ];

  return (
    <div
      className="dark relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground"
      style={{ backgroundColor: "hsl(240 10% 3.9%)", color: "hsl(0 0% 98%)" }}
    >
      <div className="relative z-20 md:pt-40 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <span className="text-muted-foreground font-montserrat font-bold">
                AI-Powered Chemistry Lab
              </span>
            </div>

       
            <h1 className="text-5xl font-bold text-gradient-hero text-transparent mb-6 pb-2 font-montserrat">
            AI Chemistry Assistant
            </h1>
       
    

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-montserrat">
              Your intelligent chemistry companion. Get instant explanations,
              solve complex problems, and explore the molecular world with
              AI-powered assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
          {/* Features Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`w-full p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedFeature === feature.id
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/70"
                    }`}
                    onClick={() => handleFeatureSelect(feature)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          selectedFeature === feature.id
                            ? "bg-white/20"
                            : feature.color + " text-white"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <div className="text-left flex-1 overflow-hidden">
                        <div className="font-medium text-sm mb-1">
                          {feature.title}
                        </div>
                        <div
                          className={`text-xs leading-relaxed ${
                            selectedFeature === feature.id
                              ? "text-white/80"
                              : "text-gray-400"
                          }`}
                        >
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Atom className="h-5 w-5 text-blue-600" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickStartQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full text-left h-auto py-2 px-3 whitespace-normal justify-start"
                    onClick={() => {
                      setInputValue(question);
                      handleSendMessage();
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-2">
            <Card className="h-[800px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat">
                  <Bot className="h-7 w-7 text-blue-600" />
                  Chat with AI Assistant
                  {selectedFeature && (
                    <Badge variant="secondary" className="ml-2 font-montserrat text-white">
                      {features.find((f) => f.id === selectedFeature)?.title}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
                {/* Messages */}
                <ScrollArea className="flex-1 pr-4 custom-scrollbar">
                  <div className="space-y-4 p-2">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 py-12">
                        <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-2 text-gradient-hero text-transparent font-montserrat">
                          Welcome to your AI Chemistry Assistant!
                        </h3>
                        <p className="text-sm font-montserrat text-slate-400">
                          Choose a feature from the left panel or ask me any
                          chemistry question. I can help with explanations,
                          equations, problem solving, and more!
                        </p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {message.sender === "ai" && (
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                          <Card
                            className={`max-w-[85%] ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "bg-gray-50 text-gray-900 border-gray-200"
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {message.content}
                              </div>
                              <div
                                className={`text-xs mt-2 ${
                                  message.sender === "user"
                                    ? "text-blue-100"
                                    : "text-gray-500"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </CardContent>
                          </Card>
                          {message.sender === "user" && (
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {chatMutation.isPending && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <Card className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span className="text-sm text-gray-600">
                                Thinking...
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <Separator />

                {/* File Upload Area */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
                  <div className="text-center">
                    <FileImage className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600 mb-3">
                      Upload chemistry problems, equations, or diagrams for AI
                      analysis
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                        className="flex items-center gap-2 bg-black hover:bg-gray-800"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Upload Image
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                             className="flex items-center gap-2 bg-black hover:bg-gray-800"
                      >
                        <FileText className="h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  {selectedFeature && (
                    <div className="flex items-center gap-2 p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                      <div
                        className={`p-2 rounded-lg ${
                          features.find((f) => f.id === selectedFeature)?.color
                        } text-white`}
                      >
                        {features.find((f) => f.id === selectedFeature)?.icon}
                      </div>
                      <span className="text-sm text-slate-200 font-medium font-montserrat">
                        {features.find((f) => f.id === selectedFeature)?.title}{" "}
                        mode active
                      </span>
                      <Button
                        size="lg"
                        variant="link"
                        onClick={() => setSelectedFeature(null)}
                        className="ml-auto h-8 w-8 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        selectedFeature
                          ? `${features
                              .find((f) => f.id === selectedFeature)
                              ?.prompt.toLowerCase()}...`
                          : "Ask me anything about chemistry..."
                      }
                      disabled={chatMutation.isPending}
                      className="flex-1 min-h-[60px] resize-none"
                      rows={2}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || chatMutation.isPending}
                      size="icon"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-[60px] w-12"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
