"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import {
  Scale,
  Send,
  FileText,
  Shield,
  CheckCircle2,
  Bot,
  User,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react"

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

const progressSteps = [
  { label: "Jurisdiction", key: "state" },
  { label: "NDA Type", key: "type" },
  { label: "Parties", key: "parties" },
  { label: "Relationship", key: "relationship" },
  { label: "Confidential Info", key: "info" },
  { label: "Terms", key: "terms" },
  { label: "Clauses", key: "clauses" },
  { label: "Review", key: "review" },
]

export default function GeneratePage() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/nda-chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Estimate progress based on message count
  const assistantMessageCount = messages.filter((m) => m.role === "assistant").length
  const estimatedStep = Math.min(assistantMessageCount, progressSteps.length)
  const progressPercent = Math.round((estimatedStep / progressSteps.length) * 100)

  // Check if NDA generation is complete
  const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop()
  const lastText = lastAssistantMessage ? getMessageText(lastAssistantMessage) : ""
  const isComplete = lastText.includes("---NDA_COMPLETE---")

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  // Auto-send initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      sendMessage({
        text: "Hi, I just purchased an NDA document and I'm ready to get started!",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleGenerateDocument = () => {
    // Parse the NDA data from the last message and store it
    const ndaData = lastText.split("---NDA_COMPLETE---")[1]?.split("---END_NDA_DATA---")[0] || ""
    const lines = ndaData.trim().split("\n")
    const data: Record<string, string> = {}
    for (const line of lines) {
      const [key, ...valueParts] = line.split(":")
      if (key && valueParts.length) {
        data[key.trim()] = valueParts.join(":").trim()
      }
    }
    sessionStorage.setItem("nda-data", JSON.stringify(data))
    router.push("/documents/nda/preview")
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="shrink-0 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Legal<span className="text-primary">Law</span>Docs
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">NDA Generator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Progress */}
        <aside className="hidden w-72 shrink-0 border-r border-border/40 bg-card/40 p-6 lg:block">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">NDA Progress</h2>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-semibold text-primary">{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-8 space-y-1">
            {progressSteps.map((step, i) => {
              const isDone = i < estimatedStep
              const isCurrent = i === estimatedStep
              return (
                <div
                  key={step.key}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isCurrent
                      ? "bg-primary/10 text-primary"
                      : isDone
                        ? "text-accent"
                        : "text-muted-foreground/50"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  ) : isCurrent ? (
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                  <span className={isDone ? "font-medium" : ""}>{step.label}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-xl border border-border/40 bg-secondary/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Tip
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Answer each question as specifically as possible. The AI will use your responses
              to customize every clause of your NDA for maximum legal protection.
            </p>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {/* Mobile progress bar */}
          <div className="border-b border-border/40 bg-card/30 px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">NDA Progress</span>
              <span className="font-semibold text-primary">{progressPercent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((message) => {
                const text = getMessageText(message)
                if (!text) return null
                const isUser = message.role === "user"

                // Don't show the initial auto-message from user visually
                if (isUser && text.includes("I just purchased an NDA document")) return null

                // Don't show the raw NDA_COMPLETE data block
                const displayText = text.includes("---NDA_COMPLETE---")
                  ? text.split("---NDA_COMPLETE---")[0].trim()
                  : text

                if (!displayText) return null

                return (
                  <div key={message.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isUser
                          ? "border border-primary/20 bg-primary/10"
                          : "border border-accent/20 bg-accent/10"
                      }`}
                    >
                      {isUser ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Bot className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                        isUser
                          ? "bg-primary/10 text-foreground"
                          : "border border-border/40 bg-card/80 text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{displayText}</p>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/80 px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Completion CTA */}
              {isComplete && !isLoading && (
                <div className="animate-slide-up rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
                    <Sparkles className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                    All Information Gathered!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We have everything we need to generate your customized, legally compliant NDA.
                  </p>
                  <Button
                    onClick={handleGenerateDocument}
                    size="lg"
                    className="mt-5 gap-2 shadow-lg shadow-primary/20"
                  >
                    Generate My NDA
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          {!isComplete && (
            <div className="shrink-0 border-t border-border/40 bg-card/30 px-4 py-4 lg:px-8">
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-center gap-3">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={isLoading}
                    className="w-full rounded-xl border border-border/60 bg-secondary/30 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="h-11 w-11 shrink-0 rounded-xl shadow-md shadow-primary/20"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
              <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-muted-foreground/60">
                Your responses are encrypted and used solely for document generation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
