import { TenderDocument } from "../../types/tender.types";
import Link from "next/link";
import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle
} from "@/components/ui/card"

interface TenderDocumentsProps {
    documents: TenderDocument[]
}

export default function TenderDocuments({documents}: TenderDocumentsProps) {

    return (
        <div className="grid grid-cols-1 mt-4">
            <Card className="p-4">
                <CardTitle>Document(s)</CardTitle>
                {documents.map((item) => (
                    <CardContent className="flex" key={item.id}>
                        <FileText /><Link target="_blank" href={item.filePath} className="ml-2 text-[#6366f1]">{item.orgFileName}</Link>
                    </CardContent>
                ))}
            </Card>
        </div>
    )
}