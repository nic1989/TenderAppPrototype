"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { usePathname } from "next/navigation";
import { getHeading } from "@/utils/utilities";

export default function AppHeader() {
  const path = usePathname();
  return (
    <header className="flex h-16 items-center justify-between border-b px-5">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <h1 className="text-lg font-semibold">
          {getHeading(path)}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}