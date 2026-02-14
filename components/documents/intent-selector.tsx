"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Intent } from "@/lib/intent-registry"

interface IntentSelectorProps {
  intents: Intent[]
  onSelect: (intent: Intent) => void
  documentTitle: string
}

export default function IntentSelector({ intents, onSelect, documentTitle }: IntentSelectorProps) {
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null)

  if (intents.length === 0) {
    // No intents needed, auto-select "standard" and proceed
    return null
  }

  const handleSelect = (intent: Intent) => {
    setSelectedIntent(intent)
  }

  const handleContinue = () => {
    if (selectedIntent) {
      onSelect(selectedIntent)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          What type of {documentTitle} do you need?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select the option that best matches your situation
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {intents.map((intent) => (
          <Card
            key={intent.id}
            className={`cursor-pointer transition-all ${
              selectedIntent?.id === intent.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border/50 hover:border-primary/30"
            }`}
            onClick={() => handleSelect(intent)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{intent.name}</CardTitle>
                {selectedIntent?.id === intent.id && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardDescription>{intent.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedIntent && (
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            size="lg"
            className="gap-2 shadow-lg shadow-primary/20"
          >
            Continue with {selectedIntent.name}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

