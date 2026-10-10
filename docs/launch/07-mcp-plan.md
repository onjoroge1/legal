# MCP alongside the launch repairs

Recommendation: add a separate read-only operations MCP after PR-04/05 contracts settle, before the PR-13 operations rollout. It is useful for Codex/Claude diagnostics but is not required for customer launch and should not delay security/document repairs. No existing MCP endpoint or SDK was found in this repository. This document is a plan, not an installed connection.

Initial tools:
- get_release_status: deployed SHA, expected migration revision, containment flag states and CI evidence links.
- get_generation_health: aggregate failures by safe code, count of unreviewed/stale source scopes, latency and success counts. No prompts, names, document text, cookies or tokens.
- get_usage_budget: reserved vs configured budget, lease counts and threshold state. Explicitly distinguish reserved from provider-billed spend.
- get_launch_backlog: audit ID, primary PR, merged/deployed/verified state and remaining evidence.
- get_payment_health: aggregate reconciliation/webhook/outbox counts after PR-07–10. No mutation or customer identifiers.

Use a private authenticated remote MCP endpoint, least-privilege read-only authorization, token rotation, constant-time secret checks or supported OAuth, the shared durable rate limiter, bounded pagination and audited access without raw secrets/PII. Validate against official current MCP transport/auth specifications when implemented; do not invent a REST endpoint and label it MCP. A provider secret is never the MCP credential.

Regression gates: unauthorized requests reveal nothing; tokens cannot access any document/user list/export; aggregate errors never contain source payloads; missing data is unavailable, never healthy; schema/version compatibility verified. Connect both Codex and Claude only after a staging protocol handshake/tool-list/tool-call test. Write tools require their own later review and explicit user authorization for the action.

Owner setup later: staging/production canonical URL and identity provider or dedicated scoped credential, approved authorized users, and which aggregate operational data may be exposed. Never paste production secrets into chat.
