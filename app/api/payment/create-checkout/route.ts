import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe, PRICE_IDS } from "@/lib/stripe"
import { getDocumentByLegacySlug } from "@/lib/document-catalog"
import { randomBytes } from "crypto"
import bcrypt from "bcryptjs"
import {
  getLegalDisclaimerAcceptance,
  requireLegalDisclaimerAcceptance,
} from "@/lib/legal-disclaimer-server"
import { requireEmergencyFeature } from "@/lib/feature-flags"

/**
 * POST /api/payment/create-checkout
 * Creates a Stripe Checkout Session for single-doc purchase or subscription.
 * Saves the document as "pending_payment" first, passes its ID to Stripe metadata
 * so the webhook can finalize it after payment succeeds.
 *
 * Supports both authenticated users (session) and guests (email in body).
 * Guests get a user record created silently; they set their password post-payment.
 */
export async function POST(request: Request) {
  try {
    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError

    const featureError = requireEmergencyFeature(
      "ENABLE_PAYMENTS",
      "Checkout"
    )
    if (featureError) return featureError

    const legalAcceptance = getLegalDisclaimerAcceptance(request)
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { paymentType, slug, formData, documentContent, intent, guestEmail, guestName } = body

    if (!paymentType || !slug) {
      return NextResponse.json({ error: "paymentType and slug are required" }, { status: 400 })
    }

    // Resolve the user — authenticated session takes priority, then guest email
    const emailToUse = session?.user?.email ?? guestEmail
    if (!emailToUse) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    let user = await prisma.user.findUnique({ where: { email: emailToUse } })

    if (!user) {
      // Guest checkout — create account silently with a secure random password.
      // They'll receive a "set your password" link via email post-payment (P6).
      const tempPassword = randomBytes(24).toString("hex")
      const hashedPassword = await bcrypt.hash(tempPassword, 10)
      user = await prisma.user.create({
        data: {
          email: emailToUse,
          name: guestName || emailToUse.split("@")[0],
          password: hashedPassword,
        },
      })
    }

    const docInfo = getDocumentByLegacySlug(slug)
    if (!docInfo) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Canonical document path for redirect URLs
    const docPath = `/documents/${docInfo.category}/${docInfo.slug}`

    // Ensure a Stripe customer exists for this user
    let stripeCustomerId = user.stripeCustomerId
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      })
      stripeCustomerId = customer.id
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      })
    }

    // Save document as pending so we can finalize it in the webhook
    const pendingDoc = await prisma.userDocument.create({
      data: {
        userId: user.id,
        title: docInfo.title,
        type: docInfo.title,
        category: docInfo.category,
        content: documentContent || "",
        status: "pending_payment",
        metadata: {
          formData: formData || {},
          slug,
          intent: intent || null,
          paymentType,
          generatedAt: new Date().toISOString(),
          legalDisclaimerVersion: legalAcceptance.version,
          legalDisclaimerAcceptedAt: legalAcceptance.acceptedAt,
        },
      },
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"

    let checkoutSession

    if (paymentType === "subscription") {
      // Recurring subscription
      checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "subscription",
        line_items: [{ price: PRICE_IDS.professional, quantity: 1 }],
        success_url: `${appUrl}/dashboard/documents/${pendingDoc.id}?payment=success`,
        cancel_url: `${appUrl}${docPath}/checkout?cancelled=true`,
        metadata: {
          userId: user.id,
          documentId: pendingDoc.id,
          paymentType: "subscription",
          isGuest: session?.user?.email ? "false" : "true",
          legalDisclaimerVersion: legalAcceptance.version,
        },
        subscription_data: {
          metadata: {
            userId: user.id,
            legalDisclaimerVersion: legalAcceptance.version,
          },
        },
      })
    } else {
      // Single-document one-time payment
      const unitAmount = Math.round((docInfo.price || 19) * 100) // price in cents
      checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: docInfo.title,
                description: "AI-assisted, state-aware document draft",
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/dashboard/documents/${pendingDoc.id}?payment=success`,
        cancel_url: `${appUrl}${docPath}/checkout?cancelled=true`,
        metadata: {
          userId: user.id,
          documentId: pendingDoc.id,
          paymentType: "single",
          isGuest: session?.user?.email ? "false" : "true",
          legalDisclaimerVersion: legalAcceptance.version,
        },
      })
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout creation error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
