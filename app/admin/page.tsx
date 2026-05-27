import { redirect } from "next/navigation"

/**
 * /admin has no landing page of its own — auto-redirect to the most
 * frequently-used admin tool. The AdminLayout has already gated this for
 * isAdmin=true, so any user reaching this redirect is already authorized.
 */
export default function AdminIndex() {
  redirect("/admin/facts")
}
