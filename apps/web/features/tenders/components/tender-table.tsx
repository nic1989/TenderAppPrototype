import { Tender } from "../types/tender.types";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./tender-table/columns";

interface TenderProps {
    tenders: Tender[];
}

export default function TenderTable({tenders}: TenderProps) {
    return (
        <div className="mt-6">
            {tenders.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={tenders}
                />
            ) : (
                <p>No tenders found.</p>
            )}
        </div>
    )
}