
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card"

interface ComplianceCardProps {
    title: string,
    value: string | number
}

export default function ComplianceCard({title, value}: ComplianceCardProps) {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{value}</p>
            </CardContent>
        </Card>
    )
}