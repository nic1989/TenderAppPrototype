"use client";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 p-6 pt-2 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}