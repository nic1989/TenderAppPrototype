import { getStatusColor } from "@/components/icons/badge-class";
import { Tender } from "../../types/tender.types";
import { Button } from "@/components/ui/button";

interface TenderDetailProps {
    tender: Tender
}

export default function TenderDetailsHeader({tender}: TenderDetailProps) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between">
                <div className="flex">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {tender.title}
                    </h1>
                    <div className={`text-center w-[100px] rounded-3xl p-2 font-medium ml-3 ${getStatusColor(tender.status)}`}>{tender.status}</div>
                </div>
                {tender.analyses?.length === 0 && tender.documents?.length > 0 && (
                    <Button variant={'outline'} className="cursor-pointer bg-indigo-500 text-white">Analyze Tender</Button>
                )}
            </div>

            <p className="text-muted-foreground">
                {tender.description}
            </p>
        </div>
    );
}
