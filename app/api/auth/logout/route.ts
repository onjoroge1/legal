import { NextResponse } from 'next/server'
import { logoutUser } from '@/lib/auth'

export async function POST() {
  try {
    return await logoutUser()
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 