"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation";
import { useLogout } from "@/features/auth/hooks/useLogout";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppSidebar() {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <Sidebar>

      <SidebarHeader className="flex items-center justify-center h-16 border-b">
        🤖 AI Bid Assistant
      </SidebarHeader>

      <SidebarContent>

        <SidebarMenu>

          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

        </SidebarMenu>

      </SidebarContent>

      <SidebarFooter>
        <Button className="cursor-pointer" onClick={logout}>
          Logout
        </Button>
      </SidebarFooter>

    </Sidebar>
  );
}