import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe, PRICE_IDS } from "@/lib/stripe"
import { getDocumentBySlug } from "@/lib/document-data"

/**
 * POST /api/payment/create-checkout
 * Creates a Stripe Checkout Session for single-doc purchase or subscription.
 * Saves the document as "pending_payment" first, passes its ID to Stripe metadata
 * so the webhook can finalize it after payment succeeds.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { paymentType, slug, formData, documentContent, intent } = body

    if (!paymentType || !slug) {
      return NextResponse.json({ error: "paymentType and slug are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const docInfo = getDocumentBySlug(slug)
    if (!docInfo) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

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
        type: docInfo.type || docInfo.title,
        category: docInfo.category || "business",
        content: documentContent || "",
        status: "pending_payment",
        metadata: {
          formData: formData || {},
          slug,
          intent: intent || null,
          paymentType,
          generatedAt: new Date().toISOString(),
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
        cancel_url: `${appUrl}/documents/${slug}/checkout?cancelled=true`,
        metadata: {
          userId: user.id,
          documentId: pendingDoc.id,
          paymentType: "subscription",
        },
        subscription_data: {
          metadata: { userId: user.id },
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
                description: "AI-generated legal document, state-compliant",
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/dashboard/documents/${pendingDoc.id}?payment=success`,
        cancel_url: `${appUrl}/documents/${slug}/checkout?cancelled=true`,
        metadata: {
          userId: user.id,
          documentId: pendingDoc.id,
          paymentType: "single",
        },
      })
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout creation error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
