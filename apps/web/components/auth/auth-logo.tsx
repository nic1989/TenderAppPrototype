import { Bot } from "lucide-react";

export default function AuthLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Bot className="h-5 w-5" />
      </div>

      <span className="text-2xl font-bold tracking-tight">
        AI Bid Assistant
      </span>
    </div>
  );
}