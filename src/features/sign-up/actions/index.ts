'use server'

import { getPayload } from 'payload'
import { SignUpFormSchema } from '../types'
import config from '@payload-config'
import { cookies } from 'next/headers'

export const signUpAction = async (signUpForm: SignUpFormSchema) => {
  try {
    const payload = await getPayload({ config })

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: signUpForm.email,
        },
      },
      limit: 1,
    })

    if (existingUser.docs.length > 0) {
      return {
        success: false,
        error: 'Pengguna dengan email ini sudah terdaftar',
      }
    }

    // Create new user
    const newUser = await payload.create({
      collection: 'users',
      data: {
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
      },
    })

    // Automatically login the user after registration
    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: signUpForm.email,
        password: signUpForm.password,
      },
    })

    if (loginResult.token) {
      const cookiesNext = await cookies()
      cookiesNext.set('payload-token', loginResult.token)
    }
    return {
      success: true,
      user: newUser,
      token: loginResult,
    }
  } catch (error) {
    console.error('Pendaftaran gagal:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Pendaftaran gagal',
    }
  }
}
