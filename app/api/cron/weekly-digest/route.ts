/**
 * GET /api/cron/weekly-digest
 *
 * Vercel-cron-triggered weekly summary email. Sent to every User with
 * isAdmin=true every Monday at 9am UTC.
 *
 * Summary includes:
 *   - Total pending facts awaiting review (with a CTA link to /admin/facts)
 *   - New pending facts added in the last 7 days
 *   - Facts approved + rejected in the last 7 days
 *   - Total approved facts (the live verified set)
 *   - Top 3 jurisdictions with the most pending backlog
 *
 * Auth: same CRON_SECRET bearer pattern as the ingest cron.
 * If RESEND_API_KEY isn't configured the route returns a "skipped" status
 * instead of failing — useful for local/dev where email isn't wired up.
 */

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email-service"

export const runtime = "nodejs"
export const maxDuration = 60

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return request.headers.get("authorization") === `Bearer ${secret}`
}

function startOfWindowDaysAgo(days: number): Date {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() - days)
  return d
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const since = startOfWindowDaysAgo(7)
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://www.legallawdocs.com"

  // ── Gather stats in parallel ──────────────────────────────────────────────
  const [
    pendingTotal,
    pendingNewLastWeek,
    approvedTotal,
    approvedLastWeek,
    rejectedLastWeek,
    topPendingByJurisdiction,
    admins,
  ] = await Promise.all([
    prisma.verifiedFact.count({ where: { status: "pending" } }),
    prisma.verifiedFact.count({ where: { status: "pending", createdAt: { gte: since } } }),
    prisma.verifiedFact.count({ where: { status: "approved" } }),
    prisma.verifiedFact.count({
      where: { status: "approved", reviewedAt: { gte: since } },
    }),
    prisma.verifiedFact.count({
      where: { status: "rejected", reviewedAt: { gte: since } },
    }),
    prisma.verifiedFact.groupBy({
      by: ["jurisdiction"],
      where: { status: "pending" },
      _count: { jurisdiction: true },
      orderBy: { _count: { jurisdiction: "desc" } },
      take: 3,
    }),
    prisma.user.findMany({
      where: { isAdmin: true },
      select: { email: true, name: true },
    }),
  ])

  if (admins.length === 0) {
    return NextResponse.json({ ok: true, skipped: "no admins to email" })
  }

  // No pending and no recent activity? Skip the email — don't be a noisy bot.
  if (pendingTotal === 0 && pendingNewLastWeek === 0 && approvedLastWeek === 0 && rejectedLastWeek === 0) {
    return NextResponse.json({ ok: true, skipped: "quiet week, no email sent" })
  }

  // ── Render the digest HTML ────────────────────────────────────────────────
  const topJurList = topPendingByJurisdiction
    .map(
      (j: { jurisdiction: string; _count: { jurisdiction: number } }) =>
        `<li style="margin:4px 0;"><strong style="text-transform:capitalize;">${j.jurisdiction}</strong> — ${j._count.jurisdiction} pending</li>`
    )
    .join("")

  const subject = `Verified Facts — weekly digest (${pendingTotal} pending)`

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <div style="background:#1e293b;padding:20px 32px;text-align:center;">
      <p style="margin:0;font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.3px;">
        Legal<span style="color:#6366f1;">Law</span>Docs &mdash; Verified Facts Digest
      </p>
    </div>
    <div style="padding:32px;">
      <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;">Weekly summary</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Activity over the last 7 days.</p>

      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
        <tr>
          <td style="padding:14px 18px;border:1px solid #e5e7eb;border-radius:8px;width:50%;">
            <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.6px;">Pending review</p>
            <p style="margin:4px 0 0;font-size:28px;font-weight:700;color:${pendingTotal > 50 ? "#ca8a04" : "#111827"};">${pendingTotal}</p>
            <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">+${pendingNewLastWeek} new this week</p>
          </td>
          <td style="width:8px;"></td>
          <td style="padding:14px 18px;border:1px solid #e5e7eb;border-radius:8px;width:50%;">
            <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.6px;">Approved (live)</p>
            <p style="margin:4px 0 0;font-size:28px;font-weight:700;color:#15803d;">${approvedTotal}</p>
            <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">+${approvedLastWeek} approved · ${rejectedLastWeek} rejected this week</p>
          </td>
        </tr>
      </table>

      ${
        topJurList
          ? `<h2 style="margin:24px 0 8px;font-size:14px;font-weight:700;color:#111827;">Top pending backlog</h2>
             <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#374151;">${topJurList}</ul>`
          : ""
      }

      <a href="${appUrl}/admin/facts" style="display:inline-block;background:#6366f1;color:#fff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
        Review pending facts →
      </a>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        This digest is sent every Monday to LegalLawDocs admins. The verified-facts
        pipeline pulls enacted bills from OpenStates throughout the week; each new
        fact requires a human approval here before it can be cited in AI-generated drafts.
      </p>
    </div>
  </div>
</body>
</html>`

  // Send one email per admin. Don't fail the whole cron if one send errors.
  let sent = 0
  for (const admin of admins) {
    try {
      const ok = await sendEmail({
        to: admin.email,
        subject,
        html,
      })
      if (ok) sent++
    } catch (err) {
      console.warn(`[cron/weekly-digest] send failed for ${admin.email}:`, err)
    }
  }

  return NextResponse.json({
    ok: true,
    adminsTargeted: admins.length,
    sent,
    stats: {
      pendingTotal,
      pendingNewLastWeek,
      approvedTotal,
      approvedLastWeek,
      rejectedLastWeek,
    },
  })
}
