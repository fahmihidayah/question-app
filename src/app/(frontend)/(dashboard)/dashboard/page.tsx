"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Pilih menu untuk memulai
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/dashboard/conferences">
          <Card className="cursor-pointer border-2 hover:border-blue-500 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Konferensi</CardTitle>
                  <CardDescription>Kelola konferensi Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Buat, edit, dan kelola konferensi untuk acara Q&A
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/auto-conferences">
          <Card className="cursor-pointer border-2 hover:border-purple-500 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Auto Konferensi</CardTitle>
                  <CardDescription>Konferensi otomatis</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Kelola konferensi yang dibuat secara otomatis oleh sistem
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/questions">
          <Card className="cursor-pointer border-2 hover:border-green-500 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Pertanyaan</CardTitle>
                  <CardDescription>Kelola pertanyaan</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lihat dan kelola semua pertanyaan dari berbagai konferensi
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}