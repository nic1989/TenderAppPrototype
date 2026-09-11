import { LucideIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction
} from "@/components/ui/card"

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
}

export default function StatCard({title, value, icon: Icon}: StatCardProps) {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardAction>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{value}</p>
            </CardContent>
        </Card>
    )
}