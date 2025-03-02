"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Avatar, Card, CardBody, Textarea } from "@nextui-org/react";
import { Bot, Send, PlusCircle, User } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Import react-markdown

// Sub-component for chat content with manual state management
function ChatContent({ onTitleChange }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user's message to the chat
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Update title on the first message
    if (messages.length === 0 && input.trim()) {
      onTitleChange(input.length > 30 ? input.substring(0, 30) + "..." : input);
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3051/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      let content = data.response.value;
      const annotations = data.response.annotations || [];

      // Process annotations for citations
      annotations.forEach((annotation, index) => {
        const marker = annotation.text; // e.g., "【4:1†source】"
        const footnoteNumber = index + 1;
        const footnoteText = `<sup>${footnoteNumber}</sup>`; // Use superscript for citation

        // Replace the annotation marker in the content
        content = content.replace(marker, footnoteText);
      });

      // Append a references section if annotations exist
      if (annotations.length > 0) {
        content += "\n\n---\n\n**References:**\n";
        annotations.forEach((annotation, index) => {
          const footnoteNumber = index + 1;
          content += `${footnoteNumber}. ${annotation.file_citation.file_id}\n`;
        });
      }

      const assistantMessage = { role: "assistant", content };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <Bot size={32} className="text-teal-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to Pension Agent
            </h2>
            <p className="text-gray-600 max-w-md">
              Ask me anything about pensions or retirement planning!
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar
                    icon={
                      message.role === "user" ? (
                        <User size={18} />
                      ) : (
                        <Bot size={18} />
                      )
                    }
                    className={
                      message.role === "user"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }
                  />
                  <Card
                    className={`shadow-md rounded-lg ${
                      message.role === "user" ? "bg-teal-500 text-white" : "bg-white"
                    }`}
                  >
                    <CardBody className="p-4">
                      {message.role === "assistant" ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <Avatar
                    icon={<Bot size={18} />}
                    className="bg-gray-200 text-gray-700"
                  />
                  <Card className="bg-white shadow-md rounded-lg">
                    <CardBody className="p-4">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="w-full max-w-3xl mx-auto px-4">
        <Card className="border border-gray-300 shadow-sm bg-white rounded-2xl">
          <form onSubmit={onSubmit} className="relative">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Message Pension Agent..."
              className="min-h-[40px] max-h-[50px] py-2 px-4 pr-12 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl"
            />
            <Button
              type="submit"
              isIconOnly
              className={`absolute right-2 bottom-2 h-8 w-8 rounded-full ${
                !input.trim() || isLoading
                  ? "text-gray-400 bg-transparent hover:bg-transparent"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
              disabled={!input.trim() || isLoading}
            >
              <Send size={16} />
            </Button>
          </form>
        </Card>
        <p className="text-xs text-center text-gray-500 mt-2">
          Pension Agent can make mistakes. Consider checking important information.
        </p>
      </div>
    </>
  );
}

export default function ChatInterface() {
  const [chatKey, setChatKey] = useState(0);
  const [chatTitle, setChatTitle] = useState("New Chat");

  const startNewChat = () => {
    setChatKey((prev) => prev + 1); // Remount ChatContent to reset chat
    setChatTitle("New Chat");
  };

  const handleTitleChange = (newTitle) => {
    setChatTitle(newTitle);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Card className="rounded-none shadow-md">
        <CardBody className="py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{chatTitle}</h1>
            <Button
              onPress={startNewChat}
              color="primary"
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-6 py-3"
              startContent={<PlusCircle size={18} />}
            >
              New chat
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Chat content with key to force remount */}
      <ChatContent key={chatKey} onTitleChange={handleTitleChange} />
    </div>
  );
}