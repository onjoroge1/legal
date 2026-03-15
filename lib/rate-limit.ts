/**
 * Simple in-memory rate limiter for API routes.
 *
 * For production at scale, swap this for a Redis-based solution
 * (e.g., @upstash/ratelimit). This implementation works well for
 * single-instance deployments and Vercel serverless (per-instance limiting).
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const stores = new Map<string, Map<string, RateLimitEntry>>()

// Periodically clean up expired entries (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    stores.forEach((store) => {
      store.forEach((entry, key) => {
        if (now > entry.resetAt) {
          store.delete(key)
        }
      })
    })
  }, 5 * 60 * 1000)
}

interface RateLimitConfig {
  /** Unique name for this limiter (e.g., "auth-login", "doc-generate") */
  name: string
  /** Time window in seconds */
  windowSeconds: number
  /** Maximum requests allowed in the window */
  maxRequests: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Check if a request should be rate-limited.
 *
 * @param config - Rate limit configuration
 * @param identifier - Unique identifier for the requester (IP, user ID, etc.)
 * @returns RateLimitResult with success=true if request is allowed
 */
export function rateLimit(
  config: RateLimitConfig,
  identifier: string
): RateLimitResult {
  const { name, windowSeconds, maxRequests } = config
  const now = Date.now()
  const windowMs = windowSeconds * 1000

  // Get or create the store for this limiter
  if (!stores.has(name)) {
    stores.set(name, new Map())
  }
  const store = stores.get(name)!

  const entry = store.get(identifier)

  // If no entry or window expired, start fresh
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs
    store.set(identifier, { count: 1, resetAt })
    return { success: true, remaining: maxRequests - 1, resetAt }
  }

  // Within window — check count
  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  // Increment and allow
  entry.count++
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Extract client IP from request headers.
 * Works with Vercel, Cloudflare, and standard proxies.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  )
}

/**
 * Create a NextResponse for rate-limited requests.
 */
export function rateLimitResponse(resetAt: number) {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000)

  return new Response(
    JSON.stringify({
      error: "Too many requests. Please try again later.",
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    }
  )
}

// ── Pre-configured limiters ────────────────────────────────────────────

/** Auth endpoints: 10 requests per 15 minutes */
export const authRateLimit = (ip: string) =>
  rateLimit({ name: "auth", windowSeconds: 15 * 60, maxRequests: 10 }, ip)

/** Document generation: 5 requests per 10 minutes */
export const generateRateLimit = (ip: string) =>
  rateLimit({ name: "doc-generate", windowSeconds: 10 * 60, maxRequests: 5 }, ip)

/** Password reset: 3 requests per 30 minutes */
export const resetPasswordRateLimit = (ip: string) =>
  rateLimit({ name: "password-reset", windowSeconds: 30 * 60, maxRequests: 3 }, ip)
