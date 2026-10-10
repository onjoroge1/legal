import assert from "node:assert/strict"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
const url = new URL(process.env.OPERATIONS_MCP_URL || "http://invalid")
if (url.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(url.hostname)) throw Error("HTTPS MCP URL required")
const token = process.env.LEGAL_OPERATIONS_MCP_TOKEN
if (!token || token.length < 32) throw Error("Dedicated MCP credential required")
const unauthorized = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: "{}", signal: AbortSignal.timeout(10000) })
assert.equal(unauthorized.status, 401)
const client = new Client({ name: "legal-connection-check", version: "1.0.0" })
try {
  await client.connect(new StreamableHTTPClientTransport(url, { requestInit: { headers: { Authorization: `Bearer ${token}` } } }))
  const { tools } = await client.listTools()
  assert.equal(tools.length, 5)
  for (const tool of tools) {
    assert.equal(tool.annotations.readOnlyHint, true)
    const result = await client.callTool({ name: tool.name, arguments: {} })
    assert.notEqual(result.isError, true, `${tool.name}: operational data unavailable`)
  }
  console.log("MCP initialize, tool-list, five aggregate calls and unauthorized denial passed")
} finally { await client.close() }
