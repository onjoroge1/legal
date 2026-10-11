import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js"
import { operationsServer } from "@/lib/operations-mcp"
import { scopedToken } from "@/lib/scoped-token"
import { reserveRequest } from "@/lib/request-budget"
import { requestError } from "@/lib/request-guard"
export const runtime = "nodejs"
export const maxDuration = 30
function authorize(request: Request) {
  if (process.env.ENABLE_OPERATIONS_MCP !== "true") return Response.json({ error: "Unavailable" }, { status: 503 })
  const canonical = process.env.OPERATIONS_MCP_ORIGIN
  if (!canonical || new URL(request.url).origin !== canonical || (request.headers.has("origin") && request.headers.get("origin") !== canonical)) return Response.json({ error: "Invalid origin" }, { status: 403 })
  if (!scopedToken(request, process.env.OPERATIONS_MCP_TOKEN)) return Response.json({ error: "Unauthorized" }, { status: 401 })
  return null
}
export async function POST(request: Request) {
  const denied = authorize(request)
  if (denied) return denied
  let server
  try {
    await reserveRequest("mcp", "operations-readonly")
    server = operationsServer()
    const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 8192 })
    await server.connect(transport)
    const response = await transport.handleRequest(request)
    // Consume the finite JSON reply before closing transport resources.
    const body = await response.arrayBuffer()
    return new Response(body.byteLength ? body : null, { status: response.status, headers: { ...Object.fromEntries(response.headers), "Cache-Control": "private, no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Operations unavailable" }, { status: 503 }) }
  finally { await server?.close() }
}
export async function GET(request: Request) { return authorize(request) ?? new Response(null, { status: 405, headers: { Allow: "POST" } }) }
export const DELETE = GET
