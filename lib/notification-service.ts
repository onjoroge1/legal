// Notification service for creating in-app notifications
// Requires Notification model in Prisma schema

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("./prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not available
}

export interface NotificationData {
  userId: string
  type: "document" | "billing" | "team" | "system"
  title: string
  message: string
  link?: string
  metadata?: Record<string, any>
}

/**
 * Create a notification
 */
export async function createNotification(data: NotificationData): Promise<void> {
  if (!prisma) {
    console.warn("Prisma not available. Notification not created:", data.title)
    return
  }

  try {
    // Check if Notification model exists
    await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        link: data.link,
        metadata: data.metadata || {},
        read: false,
      },
    })
  } catch (error) {
    // Notification model might not exist yet
    console.warn("Notification model not found. Add it to Prisma schema:", error)
  }
}

/**
 * Create document reminder notification
 */
export async function createDocumentReminderNotification(
  userId: string,
  documentTitle: string,
  documentId: string
): Promise<void> {
  await createNotification({
    userId,
    type: "document",
    title: "Document Reminder",
    message: `Your document "${documentTitle}" needs attention.`,
    link: `/dashboard/documents/${documentId}`,
    metadata: { documentId },
  })
}

/**
 * Create team activity notification
 */
export async function createTeamActivityNotification(
  userId: string,
  activity: string,
  link?: string
): Promise<void> {
  await createNotification({
    userId,
    type: "team",
    title: "Team Activity",
    message: activity,
    link,
  })
}




