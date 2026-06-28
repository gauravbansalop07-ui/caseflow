"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { FadeIn } from "@/components/shared/animated-container";
import { SUGGESTED_QUESTIONS } from "@/lib/constants";
import type { ChatSource } from "@/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
}

const MOCK_RESPONSES: Record<string, { content: string; sources?: ChatSource[] }> = {
  "What was the court's reasoning?": {
    content:
      "The court held that the basic structure of the Constitution cannot be altered by any amendment under Article 368. The majority opinion, delivered by a bench of 13 judges, established that Parliament's amending power is broad but not unlimited. The doctrine of basic structure was introduced to safeguard the fundamental framework of the Constitution, including the supremacy of the Constitution, republican and democratic form of government, secular character, and separation of powers.",
    sources: [
      { title: "Court Reasoning", section: "Para 292–305" },
      { title: "Majority Opinion", section: "Para 316", pageNumber: 42 },
    ],
  },
  "Which precedents were relied upon?": {
    content:
      "The court relied on several key precedents: (1) Shankari Prasad v. Union of India (1951) which had upheld Parliament's unlimited amending power, (2) Sajjan Singh v. State of Rajasthan (1965) which continued this position, and (3) Golaknath v. State of Punjab (1967) which reversed the earlier position and held that fundamental rights could not be amended. The Kesavananda decision partially overruled Golaknath while establishing the basic structure doctrine.",
    sources: [
      { title: "Cited Precedents", section: "Para 150–180", pageNumber: 22 },
      { title: "Overruled Cases", section: "Para 402" },
    ],
  },
  "Explain this judgment in simple language.": {
    content:
      "In simple terms, this landmark case decided that while Parliament has the power to change (amend) the Constitution, it cannot change its fundamental identity or core principles. Think of it like renovating a house — you can add rooms, repaint walls, or change the layout, but you cannot destroy the foundation. The 'basic structure' includes things like democracy, secularism, rule of law, and judicial review. This decision is considered one of the most important in Indian constitutional history.",
  },
};

function generateMockResponse(query: string): { content: string; sources?: ChatSource[] } {
  // Check for matching mock responses
  for (const [key, value] of Object.entries(MOCK_RESPONSES)) {
    if (query.toLowerCase().includes(key.toLowerCase().slice(0, 20))) {
      return value;
    }
  }

  return {
    content: `Based on my analysis of the case, I can provide the following insight regarding your query: "${query}"\n\nThe court's judgment extensively discusses this matter. The bench considered multiple perspectives, citing relevant provisions of the Constitution and prior judicial interpretations. The majority opinion emphasizes the importance of balancing legislative authority with fundamental rights protections. The reasoning draws upon established principles of constitutional interpretation and applies them to the specific facts of this case.`,
    sources: [
      { title: "Case Analysis", section: "AI Generated" },
    ],
  };
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI legal research assistant. Ask me anything about this case.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(
    (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Use local mock responses (static deployment — no API server)
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        const response = generateMockResponse(content);
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.content,
          sources: response.sources,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, delay);
    },
    []
  );

  const suggestedQuestions = SUGGESTED_QUESTIONS.slice(0, 3);

  return (
    <FadeIn className="flex flex-col h-full">
      {/* Chat messages area */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy border border-glass-border">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse [animation-delay:0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={scrollEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-glass-border bg-glass text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 pt-2">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </FadeIn>
  );
}
