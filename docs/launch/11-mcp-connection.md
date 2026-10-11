# Private operations MCP

Standard stateless Streamable HTTP at `/api/mcp`, SDK 1.32.1, five aggregate read-only tools. No document/user identifiers, arbitrary queries, provider credentials, payments, mail, generation or administrative mutations. Tool failures report unavailable, not healthy. Daily usage is reserved budget, not provider billing. Launch/backlog metadata does not imply merged, deployed or verified status.

## Connection setup

1. Deploy this branch and migrations to staging. Keep customer feature flags false. Generate a dedicated random >=32-character secret in your secret manager; do not commit or paste it into chat.
2. Set `ENABLE_OPERATIONS_MCP=true`, `OPERATIONS_MCP_ORIGIN=https://YOUR-STAGING-HOST` (exact origin, no trailing slash), and `OPERATIONS_MCP_TOKEN` to that secret. Never reuse CRON_SECRET, NEXTAUTH_SECRET or a provider key.
3. Configure a Streamable HTTP MCP client with URL `https://YOUR-STAGING-HOST/api/mcp` and `Authorization: Bearer <dedicated secret>` via the client's environment/secret facility. For Codex clients supporting bearer token environment variables, use `bearer_token_env_var = "LEGAL_OPERATIONS_MCP_TOKEN"` in the named `mcp_servers` entry. Verify current client support before configuration. This endpoint uses a private pre-shared credential, not OAuth discovery; clients requiring OAuth need an identity-provider integration before connection. Do not advertise it as a public OAuth connector.
4. Run `OPERATIONS_MCP_URL=https://YOUR-STAGING-HOST/api/mcp LEGAL_OPERATIONS_MCP_TOKEN=<from secret environment> node scripts/check-mcp-connection.mjs`. This checks initialize, tool list, read-only calls and unauthorized denial without printing credentials. Never put the actual token in shell history; inject through the secret manager.
5. Rotate by changing server and client secrets; old tokens stop working immediately. Disable the flag to close all access. Shared durable limit: 120 authenticated requests/hour. Transport max body 8KB, strict empty tool inputs, same canonical host/origin, no CORS grant, no long-lived SSE or sessions. Only request-budget bookkeeping is written by this endpoint.

The committed local protocol tests validate SDK handshake and isolation with synthetic aggregate data. They are not evidence of a deployed connection. Remote host and secret provisioning are required before claiming staging/production connectivity. Existing exposed credentials must be rotated separately.

References: https://modelcontextprotocol.io/specification/2025-11-25/basic/transports and the installed SDK's WebStandardStreamableHTTPServerTransport.
