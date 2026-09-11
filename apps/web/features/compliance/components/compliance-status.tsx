import { Badge } from "lucide-react";
import { useCallback } from "react";

interface ComplianceStatusProps {
    status: string;
}

export default function ComplianceStatus({status}: ComplianceStatusProps) {
    const getComplianceStatus = useCallback((val: string) => {
        let htmlContent: React.ReactNode;
        if (val === 'PASS') {
            htmlContent = <span className="flex"><Badge className="text-green-200 mr-2" />Pass</span>
        }
        if (val === 'FAIL') {
            htmlContent = <span className="flex"><Badge className="text-red-500 mr-2" />Fail</span>
        }
        if (val === 'NOT_AVAILABLE') {
            htmlContent = <span className="flex"><Badge className="text-yellow-200 mr-2" />N/A</span>
        }

        return <div className={`text-center w-[100px] rounded-3xl p-2 font-medium`}>{htmlContent}</div>
    }, [])

    return getComplianceStatus(status)
}