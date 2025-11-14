import React from 'react'
import './styles.css'
import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/layouts/navbar'
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'


export async function generateMetadata(): Promise<Metadata> {
    return {
        title : "KonfQ - Platform Tanya Jawab Konferensi",
        description : "Platform interaktif untuk tanya jawab konferensi yang memungkinkan audiens berpartisipasi aktif dalam diskusi",
        openGraph : mergeOpenGraph()
    }
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
