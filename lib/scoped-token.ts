import { createHash, timingSafeEqual } from "crypto"
// Dedicated random bearer secrets; never accepts account passwords, cookies or provider keys.
export function scopedToken(request: Request, secret: string | undefined) {
  if (!secret || secret.length < 32) return false
  const supplied = request.headers.get("authorization") ?? ""
  const digest = (s: string) => createHash("sha256").update(s).digest()
  return timingSafeEqual(digest(supplied), digest(`Bearer ${secret}`))
}
