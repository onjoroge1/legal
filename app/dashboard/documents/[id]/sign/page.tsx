import Link from "next/link"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LEGAL_DISCLAIMER_PRIMARY_COPY } from "@/lib/legal-disclaimer"

interface DocumentSignPageProps {
  params: Promise<{ id: string }>
}

export default async function DocumentSignPage({ params }: DocumentSignPageProps) {
  const { id } = await params

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12">
      <Card className="w-full border-amber-300 bg-amber-50/40">
        <CardHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <ShieldAlert className="h-6 w-6 text-amber-700" aria-hidden="true" />
          </div>
          <CardTitle>Electronic signing is temporarily unavailable</CardTitle>
          <CardDescription>
            We are keeping signing disabled until its security, identity-verification, consent,
            audit-trail, and retention controls have completed production review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm leading-6 text-muted-foreground">
            You can continue reviewing and editing your draft. Downloading or typing a name does
            not establish that a document is valid, enforceable, or appropriate for your facts.
          </p>
          <aside className="rounded-md border border-amber-300 bg-white p-4 text-sm leading-6" role="note">
            <strong>Legal notice:</strong> {LEGAL_DISCLAIMER_PRIMARY_COPY}
          </aside>
          <Button asChild variant="outline">
            <Link href={`/dashboard/documents/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to document
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
