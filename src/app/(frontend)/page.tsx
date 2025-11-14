import LandingPageWithAuth from '@/components/LandingPage/example'
import { Metadata } from 'next'
import { Suspense } from 'react'

export default async function HomePage() {
    return <Suspense>
        <LandingPageWithAuth />
    </Suspense>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title : "KonfQ - Platform Tanya Jawab Konferensi",
        description : "Platform interaktif untuk tanya jawab konferensi yang memungkinkan audiens berpartisipasi aktif dalam diskusi"
    }
}
