'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

export const logoutAction = async () => {
  try {
    const payload = await getPayload({ config })

    // Clear any additional cookies if needed
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')
    revalidateTag('/')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Logout gagal',
    }
  }
}
