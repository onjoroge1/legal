# Security policy

## Reporting a vulnerability

Please do not open a public issue for a suspected vulnerability or exposed
credential. Email `security@legallawdocs.com` with a concise description,
affected route or component, reproduction steps, and potential impact.

Do not include real user documents, passwords, payment data, access tokens, or
other personal information in the report. We will acknowledge receipt and
coordinate remediation privately.

## Repository safety

- Never commit `.env` files, credentials, database files, backups, or user uploads.
- Use the deployment platform's encrypted environment-variable store.
- Revoke and rotate a secret immediately if it is exposed.
- Run `pnpm check:security` before opening a pull request.
