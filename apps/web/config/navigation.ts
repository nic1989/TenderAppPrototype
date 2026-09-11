import {
  FileText,
  Brain,
  MessageCircle,
  ShieldCheck,
  ClipboardCheck,
  GitCompare,
  Building2,
  FileBadge2,
  House
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Tenders",
    href: "/tenders",
    icon: FileText,
  },
  {
    title: "AI Analysis",
    href: "/analysis",
    icon: Brain,
  },
  {
    title: "Tender Chat",
    href: "/tender-chat",
    icon: MessageCircle,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: ShieldCheck,
  },
  {
    title: "Checklist",
    href: "/checklist",
    icon: ClipboardCheck,
  },
  {
    title: "Comparison",
    href: "/comparison",
    icon: GitCompare,
  },
  {
    title: "Company Profile",
    href: "/company-profile",
    icon: Building2,
  },
  {
    title: "Proposal",
    href: "/proposal",
    icon: FileBadge2,
  },
];