import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto"
export const deliveryHash = (value: string) => createHash("sha256").update(value).digest("hex")
export const recipientHash = (email: string) => deliveryHash(email.trim().toLowerCase())
function key() {
  const raw = process.env.EMAIL_DELIVERY_ENCRYPTION_KEY ?? ""
  const bytes = Buffer.from(raw, "base64")
  if (bytes.length !== 32 || bytes.toString("base64") !== raw) throw new Error("DELIVERY_KEY_REQUIRED")
  return bytes
}
export function sealDelivery(value: unknown) {
  const iv = randomBytes(12); const cipher = createCipheriv("aes-256-gcm", key(), iv)
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()])
  return [iv, cipher.getAuthTag(), encrypted].map(v => v.toString("base64")).join(".")
}
export function openDelivery<T>(value: string): T {
  const [iv, tag, encrypted] = value.split(".").map(v => Buffer.from(v, "base64"))
  const cipher = createDecipheriv("aes-256-gcm", key(), iv); cipher.setAuthTag(tag)
  return JSON.parse(Buffer.concat([cipher.update(encrypted), cipher.final()]).toString("utf8")) as T
}
export function deliveryOrigin() {
  const url = new URL(process.env.NEXTAUTH_URL ?? "http://invalid")
  if (url.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(url.hostname))) throw new Error("DELIVERY_ORIGIN_REQUIRED")
  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) throw new Error("DELIVERY_ORIGIN_REQUIRED")
  return url.origin
}
export function checkDeliveryConfiguration() {
  key(); deliveryOrigin()
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) throw new Error("EMAIL_PROVIDER_REQUIRED")
}
