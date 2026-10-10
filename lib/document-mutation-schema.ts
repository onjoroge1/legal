import { z } from "zod"
import { formSchema } from "./request-guard"
const text = z.string().max(200)
export const draftMetadataSchema = z.object({ formData: formSchema.optional(), slug: text.optional(), intent: text.nullable().optional(), source: text.optional(), documentType: text.optional(), generatedAt: z.string().datetime().optional() }).strict()
export const documentMutationSchema = z.object({ id: text.optional(), documentId: text.optional(), title: text.min(1).optional(), type: text.optional(), slug: text.optional(), category: text.optional(), content: z.string().max(60000).optional(), status: z.literal("draft").optional(), metadata: draftMetadataSchema.optional(), jurisdiction: text.optional(), state: text.optional(), description: z.string().max(2000).optional() }).strict()
export function editableLegacyDocument(doc: { status: string; metadata?: unknown }): boolean {
  const metadata = doc.metadata as Record<string, unknown> | null
  return doc.status === "draft" && !metadata?.signatures && !metadata?.signingRequests && !metadata?.versionId
}
