import { SignInForm } from '@/features/sign-in/components/form'
import { Suspense } from 'react'

export default function SignInPage() {
  return <Suspense>
    <SignInForm />
  </Suspense>
}