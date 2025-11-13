import React from 'react'
import './styles.css'
import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/layouts/navbar'

export const metadata = {
  description: 'A modern web application built with Payload CMS and Next.js.',
  title: 'Payload Starter',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <main className='bg-blue-100 dark:bg-blue-900/30'>{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
