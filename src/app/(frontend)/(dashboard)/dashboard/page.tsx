"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
  Clock
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Konferensi
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pertanyaan
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">
              +12 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pengguna Aktif
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +47 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tingkat Partisipasi
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +5% dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Aktivitas Mingguan
            </CardTitle>
            <CardDescription>
              Pertanyaan dan konferensi dalam 7 hari terakhir
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
            <div className="text-center text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Grafik aktivitas akan ditampilkan di sini</p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Konferensi Terbaru
            </CardTitle>
            <CardDescription>
              Konferensi yang baru saja dibuat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">Workshop AI untuk Pemula</p>
                  <p className="text-sm text-muted-foreground">2 jam yang lalu</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Aktif</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">Seminar Web Development</p>
                  <p className="text-sm text-muted-foreground">5 jam yang lalu</p>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Selesai</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">Q&A Session: React Best Practices</p>
                  <p className="text-sm text-muted-foreground">1 hari yang lalu</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Terjadwal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-purple-600" />
            Aksi Cepat
          </CardTitle>
          <CardDescription>
            Akses cepat ke fitur-fitur utama
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4 cursor-pointer border-dashed border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Buat Konferensi</h3>
                  <p className="text-sm text-muted-foreground">Buat konferensi baru</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer border-dashed border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold">Lihat Pertanyaan</h3>
                  <p className="text-sm text-muted-foreground">Kelola pertanyaan</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer border-dashed border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Kelola Pengguna</h3>
                  <p className="text-sm text-muted-foreground">Pengaturan pengguna</p>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}