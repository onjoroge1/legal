# Launch PR-08 — isolated and idempotent checkout

PAY-04, PAY-06, PAY-08, PAY-09. `/api/payment/create-checkout` accepts an owned/cookie-bound, reviewed version and payment type. It never accepts document text, price, customer ID or owner ID. `/api/billing/checkout` accepts only `{tier:"professional"}` for an authenticated account; it creates no document. Starter selects a document rather than a recurring plan.

Guest email is receipt contact only, never proof of account identity. No account or customer lookup by email, temporary password, or account-wide grant. A guest purchase stays bound to the original guest draft. Subscriptions require an authenticated owner. Cross-browser guest claiming and durable mail delivery belong to PR-10.

The server reads configured active Stripe prices (USD, positive fixed amount, one-time Standard or monthly Premium); the prices endpoint feeds the checkout UI. Orders snapshot price, currency, exact version hash and legal acceptance. Checkout uses those snapshots with provider idempotency plus database serialization, a one-hour expiry and one active order per identity/product. Retry returns the same session. Expired sessions release that key; completed or ambiguous sessions require reconciliation, never a second charge. Unresolved crashed session publication fails closed and is visible operationally. Never delete payment evidence during abandoned checkout cleanup.

Configure sandbox Standard/Premium prices, webhook and rotated restricted credentials before enabling payments. Production commercial prices, refund wording, tax registrations and real sandbox end-to-end evidence are release gates. No live charge or tax configuration is performed by this change.
