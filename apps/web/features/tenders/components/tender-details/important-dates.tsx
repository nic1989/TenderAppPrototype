import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

interface DatesProps {
    closingDate: string
    openingDate: string
    preBidMeeting: string
    publicationDate: string
}

interface ImportantDatesProps {
    label: string
    dates: DatesProps
}

export default function ImportantDates({label, dates}: ImportantDatesProps ) {
    return (
        <CardContent className="mt-2">
            <div className="text-base font-bold mb-1">{label}</div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 mt-4 w-[40%]">
                <span>Closing Date:</span>
                <span>{dates.closingDate}</span>
                <span>Opening Date:</span>
                <span>{dates.openingDate}</span>
                <span>Pre Bid Meeting:</span>
                <span>{dates.preBidMeeting}</span>
                <span>Publication Date:</span>
                <span>{dates.publicationDate}</span>
            </div>
        </CardContent>
    )
}