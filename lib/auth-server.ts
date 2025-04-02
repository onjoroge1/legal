import { cookies } from 'next/headers'
import { compare, hash } from 'bcryptjs'
import { prisma } from './prisma'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'

// Helper functions for password management
export async function hashPassword(password: string) {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

// User management functions
export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return user
}

export async function getCurrentUser() {
  try {
    const cookiesList = cookies() as unknown as RequestCookies
    const sessionCookie = cookiesList.get('next-auth.session-token')
    const sessionToken = sessionCookie?.value

    if (!sessionToken) {
      return null
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    })

    if (!session) {
      return null
    }

    return session.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function logoutUser() {
  try {
    const cookiesList = cookies() as unknown as RequestCookies
    const sessionCookie = cookiesList.get('next-auth.session-token')
    const sessionToken = sessionCookie?.value

    if (sessionToken) {
      await prisma.session.delete({
        where: { sessionToken },
      })
    }
  } catch (error) {
    console.error('Error logging out user:', error)
  }
} 