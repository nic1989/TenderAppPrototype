import { getStatusColor } from "@/components/icons/badge-class";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  label?: string;
  count: number;
  icon: LucideIcon;
}

export default function SummaryCard({
  title,
  label,
  count,
  icon: Icon
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="flex h-[280px] flex-col items-center justify-center space-y-5">
        <div
          className={`rounded-full p-4 ${getStatusColor(label)}`}
        >
          <Icon className="h-10 w-10" />
        </div>

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-5xl font-bold">
          {count}
        </p>

        <p className="text-muted-foreground">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}