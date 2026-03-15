"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Clock, MessageSquare, Scale, Loader2, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-24">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <MessageSquare className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our platform or need assistance? Our team is
              here to help. Fill out the form below or reach out through one of
              our contact channels.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-foreground">Message Sent!</h3>
                      <p className="mt-2 text-muted-foreground">
                        Thank you for reaching out. We&apos;ll get back to you within 24 business hours.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your question or issue in detail..."
                          className="min-h-[160px]"
                          required
                        />
                      </div>
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        className="w-full sm:w-auto shadow-md shadow-primary/20"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Email Support
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        For general inquiries and support
                      </p>
                      <Link
                        href="mailto:support@legallawdocs.com"
                        className="mt-2 inline-block text-sm text-primary hover:underline"
                      >
                        support@legallawdocs.com
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Legal Inquiries
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        For legal or compliance matters
                      </p>
                      <Link
                        href="mailto:legal@legallawdocs.com"
                        className="mt-2 inline-block text-sm text-primary hover:underline"
                      >
                        legal@legallawdocs.com
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Response Time
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We typically respond within 24 business hours. Priority
                        support is available for Professional and Enterprise plan
                        subscribers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Please Note:</strong>{" "}
                  LegalLawDocs.com is not a law firm and cannot provide legal
                  advice. Our support team can assist with platform-related
                  questions, billing inquiries, and technical issues. For legal
                  advice, please consult a qualified attorney.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
