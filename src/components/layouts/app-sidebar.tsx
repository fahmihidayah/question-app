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
  ChevronRight,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getMeUser } from "@/utilities/getMeUser"
import { logoutAction } from "@/features/sign-in/actions/logout"
import type { User as UserType } from "@/payload-types"

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
      url: "/dashboard/conferences",
      icon: Calendar,
    },
    {
      title: "Auto Konferensi",
      url: "/dashboard/auto-conferences",
      icon: Zap,
    },
    {
      title: "Pertanyaan",
      url: "/dashboard/questions",
      icon: MessageSquare,
    },
    // {
    //   title: "Wadah Bertanya",
    //   url: "/dashboard/ask",
    //   icon: HelpCircle,
    // },
  ],
  // navSecondary: [
  //   {
  //     title: "Pengguna dan Izin",
  //     url: "/dashboard/users",
  //     icon: Users,
  //   },
  //   {
  //     title: "Pengaturan",
  //     url: "/dashboard/settings",
  //     icon: Settings,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useSidebar()
  const [user, setUser] = React.useState<UserType | null>(null)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user: userData } = await getMeUser()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logoutAction()
      router.push('/sign-in')
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    const name = user.name || user.email || ''
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

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
          {/* <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
            Administrasi
          </SidebarGroupLabel> */}
          {/* <SidebarGroupContent>
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
          </SidebarGroupContent> */}
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="relative transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group"
                  tooltip="Profil Pengguna"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8 rounded-lg ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-200">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || 'User'} />
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white group-data-[collapsible=icon]:hidden" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold group-hover:text-blue-600 transition-colors duration-200">
                      {user?.name || 'Loading...'}
                    </span>
                    <span className="truncate text-xs text-muted-foreground group-hover:text-blue-500 transition-colors duration-200">
                      {user?.email || 'Loading...'}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || ''}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}