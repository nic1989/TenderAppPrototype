"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Tender } from "../../types/tender.types";
import { useRouter } from "next/navigation";

interface Props {
  tender: Tender;
}

export default function TenderRowActions({ tender }: Props) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem className="cursor-pointer">
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/tenders/${tender.id}`)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Analyze Tender
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Download Document
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive cursor-pointer">
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}