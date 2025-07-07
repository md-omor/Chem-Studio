import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AiChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialContext?: string;
  reactionElements?: string[];
}

export function AiChatModal({ open, onOpenChange, initialContext, reactionElements }: AiChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const context = initialContext ? `Context: ${initialContext}\n\nElements involved: ${reactionElements?.join(", ") || "None"}\n\nQuestion: ${question}` : question;
      const response = await apiRequest("POST", "/api/chat", { question: context });
      return response.json();
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: data.response,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: () => {
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + "-user",
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Why do these elements react this way?",
    "What are the real-world applications?",
    "Are there any safety concerns?",
    "What similar reactions exist?",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Chemistry Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Chat Messages */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full custom-scrollbar">
              <div className="space-y-4 p-4 min-h-[400px]">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Ask me anything about chemistry, reactions, or the elements you're working with!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "ai" && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                      <Card
                        className={`max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
                            : "bg-gray-50 text-gray-900 border-gray-200"
                        }`}
                      >
                        <div className="p-4">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                          <div className={`text-xs mt-2 ${
                            message.sender === "user" ? "text-blue-100" : "text-gray-500"
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
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
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Suggested questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left h-auto py-2 px-3 whitespace-normal"
                    onClick={() => {
                      setInputValue(question);
                      handleSendMessage();
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the chemistry, safety, applications..."
              disabled={chatMutation.isPending}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || chatMutation.isPending}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}