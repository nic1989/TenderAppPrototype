import { DataTable } from "@/components/data-table/data-table";
import { columns } from './compliance-column'
import { ComplianceCheck } from "../types/compliance.types";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

interface ComplianceTableProps {
    complianceCheck: ComplianceCheck[];
}

export default function ComplianceCheckTable({complianceCheck}: ComplianceTableProps) {
    return (
        <CardContent className="mt-2">
            <div className="text-base font-bold mb-1">{'Compliance Checklist'}</div>
            <DataTable
                columns={columns}
                data={complianceCheck}
            />
        </CardContent>
    )
}