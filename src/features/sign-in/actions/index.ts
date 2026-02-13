'use server'

import { getPayload } from 'payload'
import { SignInFormSchema } from '../types'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

export const signInAction = async (signInForm: SignInFormSchema) => {
  const payload = await getPayload({ config })

  const token = await payload.login({
    collection: 'users',
    data: {
      email: signInForm.email,
      password: signInForm.password,
    },
  })

  const cookiesNext = await cookies()

  if (token.token) {
    cookiesNext.set('payload-token', token.token)
  }
  revalidateTag('/', 'max')

  return token
}

export const signInWithGoogleAction = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const googleAuthUrl = `${baseUrl}/api/oauth/google`

  return { redirectUrl: googleAuthUrl }
}
