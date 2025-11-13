"use client"

import * as React from "react"
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  HelpCircle,
  Calendar,
  Zap,
  Shield,
  User,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Konferensi",
      url: "/conferences",
      icon: Calendar,
    },
    {
      title: "Auto Konferensi",
      url: "/auto-conferences",
      icon: Zap,
    },
    {
      title: "Pertanyaan",
      url: "/questions",
      icon: MessageSquare,
    },
    {
      title: "Wadah Bertanya",
      url: "/ask",
      icon: HelpCircle,
    },
  ],
  navSecondary: [
    {
      title: "Pengguna dan Izin",
      url: "/users",
      icon: Users,
    },
    {
      title: "Pengaturan",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110">
            <MessageSquare className="size-4 transition-transform duration-200 group-hover:rotate-12" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KonfQ
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Platform Q&A
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                      isActive={isActive}
                      className="relative transition-all duration-200 hover:translate-x-1 hover:shadow-md active:scale-[0.98] group"
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`size-4 transition-all duration-200 group-hover:scale-110 ${
                          isActive ? 'text-blue-600' : 'text-muted-foreground group-hover:text-blue-600'
                        }`} />
                        <span className={`transition-all duration-200 ${
                          isActive ? 'font-semibold text-blue-600' : 'group-hover:text-blue-600'
                        }`}>
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full" />
                        )}
                        <ChevronRight className={`size-3 ml-auto opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 ${
                          state === "collapsed" ? "hidden" : ""
                        }`} />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator className="my-4 bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
            Administrasi
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                      isActive={isActive}
                      className="relative transition-all duration-200 hover:translate-x-1 hover:shadow-md active:scale-[0.98] group"
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`size-4 transition-all duration-200 group-hover:scale-110 ${
                          isActive ? 'text-purple-600' : 'text-muted-foreground group-hover:text-purple-600'
                        }`} />
                        <span className={`transition-all duration-200 ${
                          isActive ? 'font-semibold text-purple-600' : 'group-hover:text-purple-600'
                        }`}>
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-purple-600 rounded-r-full" />
                        )}
                        <ChevronRight className={`size-3 ml-auto opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 ${
                          state === "collapsed" ? "hidden" : ""
                        }`} />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              className="relative transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group"
              tooltip="Profil Pengguna"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 rounded-lg ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-200">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white group-data-[collapsible=icon]:hidden" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold group-hover:text-blue-600 transition-colors duration-200">
                  User Name
                </span>
                <span className="truncate text-xs text-muted-foreground group-hover:text-blue-500 transition-colors duration-200">
                  user@example.com
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}