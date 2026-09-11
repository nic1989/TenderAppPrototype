import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { ReadMore } from "./read-more";

interface AppSummaryProps {
    label: string
    text: string
}

export default function AppSummary({label, text}: AppSummaryProps) {
    return (
        <CardContent className="mt-2">
            <div className="text-base font-bold mb-1">{label}</div>
            <Separator />
            <div className="flex justify-content mt-4"><ReadMore text={text} characterLimit={200} /></div>
        </CardContent>
    )
}