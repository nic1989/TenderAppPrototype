import { Check } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

interface ListContentProps {
    label: string
    items: string[]
    icon?: boolean
}

export default function AppListContent({label, items, icon = false}: ListContentProps) {
    return (
        <CardContent className="mt-2">
            <div className="text-base font-bold mb-1">{label}</div>
            <Separator />
            <ul className="list-disc pl-5 space-y-2 text-sm mt-4">
                {items?.map((item, index) => (
                    <li key={index} className={`${icon ? 'flex': ''}`}>{icon && <Check className="text-green-700" /> }&nbsp;{item}</li>
                ))}
            </ul>
        </CardContent>
    )
}