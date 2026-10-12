import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { guardAccount } from "@/lib/request-budget"
import { RequestError, requestError } from "@/lib/request-guard"
import { readAvatar, storeAvatar } from "@/lib/avatar-storage"
export const runtime = "nodejs"
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
    if (request.headers.get("origin") !== new URL(request.url).origin) throw new RequestError(403,"CROSS_ORIGIN_REQUEST")
    await guardAccount(request)
    const reader = request.body?.getReader(); if (!reader) throw new RequestError(400,"IMAGE_REQUIRED")
    const chunks: Uint8Array[] = []; let size = 0
    try { while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length; if (size > 2*1024*1024+8192) { await reader.cancel(); throw new RequestError(413,"AVATAR_TOO_LARGE") }; chunks.push(value) } } finally { reader.releaseLock() }
    const form = await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type") ?? "" } }).formData()
    const file = form.get("file")
    if (!(file instanceof File) || file.size > 2*1024*1024 || !file.size) throw new RequestError(400,"INVALID_AVATAR_IMAGE")
    const url = await storeAvatar(session.user.id, Buffer.from(await file.arrayBuffer()))
    return Response.json({ url }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Avatar unavailable. Please try again later." }, { status: 503 }) }
}
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return new Response(null,{ status:401 })
    const id = new URL(request.url).searchParams.get("id") ?? ""
    const result = await readAvatar(session.user.id,id)
    if (!result || result.statusCode !== 200) return new Response(null,{ status:404 })
    return new Response(result.stream,{ headers:{ "Content-Type":"image/webp", "Cache-Control":"private, no-store", "X-Content-Type-Options":"nosniff" } })
  } catch { return new Response(null,{ status:503 }) }
}
