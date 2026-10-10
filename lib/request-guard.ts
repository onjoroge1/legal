import { z } from "zod"

export class RequestError extends Error {
  constructor(public status: number, public code: string) { super(code) }
}
export function requestError(error: unknown): Response | null {
  if (error instanceof RequestError) return Response.json({ error: error.code }, { status: error.status, headers: { "Cache-Control": "no-store", ...(error.status === 429 ? { "Retry-After": "60" } : {}) } })
  if (error instanceof z.ZodError) return Response.json({ error: "INVALID_REQUEST" }, { status: 400 })
  return null
}
/** Read the actual stream, not just the optional and untrusted Content-Length. */
export async function readJson(request: Request, maxBytes = 32768): Promise<unknown> {
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) throw new RequestError(403, "CROSS_ORIGIN_REQUEST")
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new RequestError(415, "JSON_REQUIRED")
  if (Number(request.headers.get("content-length")) > maxBytes) throw new RequestError(413, "REQUEST_TOO_LARGE")
  const reader = request.body?.getReader()
  if (!reader) throw new RequestError(400, "INVALID_JSON")
  const chunks: Uint8Array[] = []; let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) { await reader.cancel(); throw new RequestError(413, "REQUEST_TOO_LARGE") }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")) } catch { throw new RequestError(400, "INVALID_JSON") }
}
const value = z.union([z.string().max(4000), z.number().finite(), z.boolean(), z.null()])
export const formSchema = z.record(z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,79}$/).refine(k => !["constructor", "prototype", "__proto__"].includes(k)), value).refine(v => Object.keys(v).length <= 100)
export const generationSchema = z.object({ formData: formSchema, draftId: z.string().uuid().optional(), intent: z.string().regex(/^[a-z0-9_-]{1,80}$/).nullable().optional() }).strict()
export const chatSchema = z.object({
  messages: z.array(z.object({ id: z.string().max(128), role: z.enum(["user", "assistant"]), parts: z.array(z.object({ type: z.literal("text"), text: z.string().max(8000) }).strict()).min(1).max(8) }).strict()).min(1).max(40),
  intent: z.string().regex(/^[a-z0-9_-]{1,80}$/).nullable().optional(),
}).strict()
export function substituteLiteral(content: string, key: string, value: string): string {
  return content.split(`{${key}}`).join(value)
}
