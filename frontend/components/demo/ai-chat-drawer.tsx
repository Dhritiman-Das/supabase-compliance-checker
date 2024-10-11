"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Bot } from "lucide-react";

interface AIChatDrawerProps {
  systemPrompt: string;
}

export default function AIChatDrawer({ systemPrompt }: AIChatDrawerProps) {
  const [open, setOpen] = useState(false);
  const [isInitialMessage, setIsInitialMessage] = useState(true);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "system",
        role: "system",
        content: systemPrompt,
      },
    ],
  });

  const visibleMessages = messages.filter(
    (message) => message.role !== "system"
  );

  const handleDrawerOpen = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen && isInitialMessage) {
        setIsInitialMessage(false);
        handleSubmit(new Event("submit") as any);
      }
    },
    [isInitialMessage, handleSubmit]
  );

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Bot size={16} />
          Assistant
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>AI Assistant</DrawerTitle>
          <DrawerDescription>Chat with our AI assistant</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user" ? "bg-primary/10" : "bg-secondary"
                }`}
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-2" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-4 mb-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-4 mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-bold mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-bold mb-2" {...props} />
                    ),
                    //@ts-ignore
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <pre className="rounded bg-gray-800 p-2 mb-2">
                          <code className={`language-${match[1]}`} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-gray-200 rounded px-1" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
        {/* <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
