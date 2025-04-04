import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600

export async function GET() {
  try {
    console.log("[GET /api/dashboard/categories] Starting request")
    
    // First check if prisma is initialized
    if (!prisma) {
      console.error("[GET /api/dashboard/categories] Prisma client is not initialized")
      return NextResponse.json(
        { error: "Database connection not initialized" },
        { status: 500 }
      )
    }

    // Get session with error handling
    let session
    try {
      session = await getServerSession(authOptions)
      console.log("[GET /api/dashboard/categories] Session:", {
        exists: !!session,
        user: session?.user ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name
        } : null
      })
    } catch (sessionError) {
      console.error("[GET /api/dashboard/categories] Session error:", sessionError)
      return NextResponse.json(
        { error: "Failed to get session" },
        { status: 500 }
      )
    }
    
    if (!session?.user?.id) {
      console.log("[GET /api/dashboard/categories] No valid session found, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check cache headers
    const headersList = await headers()
    const ifNoneMatch = headersList.get("if-none-match")
    const ifModifiedSince = headersList.get("if-modified-since")
    console.log("[GET /api/dashboard/categories] Cache headers:", { ifNoneMatch, ifModifiedSince })

    // Get the latest update timestamp with error handling
    let latestUpdate
    try {
      console.log("[GET /api/dashboard/categories] Fetching latest update timestamp")
      latestUpdate = await prisma.category.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true }
      })
      console.log("[GET /api/dashboard/categories] Latest update:", latestUpdate)
    } catch (timestampError) {
      console.error("[GET /api/dashboard/categories] Error fetching timestamp:", timestampError)
      return NextResponse.json(
        { error: "Failed to check category updates" },
        { status: 500 }
      )
    }

    // Generate ETag based on latest update
    const etag = latestUpdate ? `"${latestUpdate.updatedAt.getTime()}"` : null
    console.log("[GET /api/dashboard/categories] Generated ETag:", etag)

    // Check if client has cached version
    if (ifNoneMatch === etag) {
      console.log("[GET /api/dashboard/categories] Using cached version")
      return new NextResponse(null, { status: 304 })
    }

    // Fetch categories with optimized query
    let categories
    try {
      console.log("[GET /api/dashboard/categories] Fetching categories from database")
      categories = await prisma.category.findMany({
        include: {
          templates: {
            select: {
              id: true,
              name: true,
              description: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      })
      console.log("[GET /api/dashboard/categories] Raw categories count:", categories.length)
      console.log("[GET /api/dashboard/categories] First category sample:", categories[0])
    } catch (categoriesError) {
      console.error("[GET /api/dashboard/categories] Error fetching categories:", categoriesError)
      return NextResponse.json(
        { error: "Failed to fetch categories from database" },
        { status: 500 }
      )
    }

    // Transform the data
    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description || "",
      templates: category.templates.map(template => ({
        id: template.id,
        name: template.name,
        description: template.description || ""
      }))
    }))
    console.log("[GET /api/dashboard/categories] Transformed categories count:", transformedCategories.length)

    // Create response with cache headers
    const response = NextResponse.json(transformedCategories)
    
    // Set cache headers
    response.headers.set('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`)
    if (etag) {
      response.headers.set('ETag', etag)
    }
    if (latestUpdate) {
      response.headers.set('Last-Modified', latestUpdate.updatedAt.toUTCString())
    }

    console.log("[GET /api/dashboard/categories] Response headers:", {
      'Cache-Control': response.headers.get('Cache-Control'),
      'ETag': response.headers.get('ETag'),
      'Last-Modified': response.headers.get('Last-Modified')
    })
    return response
  } catch (error) {
    console.error("[GET /api/dashboard/categories] Unhandled error:", error)
    if (error instanceof Error) {
      console.error("[GET /api/dashboard/categories] Error name:", error.name)
      console.error("[GET /api/dashboard/categories] Error message:", error.message)
      console.error("[GET /api/dashboard/categories] Error stack:", error.stack)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 