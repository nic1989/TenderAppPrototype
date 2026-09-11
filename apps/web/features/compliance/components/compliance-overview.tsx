import { ComplianceCheck, ComplianceResponse } from "../types/compliance.types"
import ComplianceCard from "./compliance-card"
import ComplianceHeader from "./compliance-header"
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import ComplianceCheckTable from "./compliance-check-table";
import AppSummary from "@/components/layout/app-summary";
import AppListContent from "@/components/layout/app-list-content";
import { Star } from "lucide-react";
import { useCallback } from "react";

interface ComplianceOverviewProps {
    complianceData: ComplianceResponse
}

export default function ComplianceOverview({complianceData}: ComplianceOverviewProps) {
    
    const data = {
    "eligible": "ELIGIBLE",
    "score": 85,
    "summary": "The company meets all primary eligibility criteria, including turnover, certifications, and experience. However, it failed to provide specific documentation mentioned in the tender requirements and lacks clarity on mandatory financial documentation beyond simple turnover.",
    "checks": [
        {
            "requirement": "Minimum turnover (50% of estimated cost: ~2.72 Crores)",
            "companyValue": "65 Crores",
            "status": "PASS",
            "remarks": "Turnover significantly exceeds the required amount."
        },
        {
            "requirement": "Experience (Similar works in last 7 years)",
            "companyValue": "7 Years",
            "status": "PASS",
            "remarks": "Company meets the 7-year experience requirement."
        },
        {
            "requirement": "Certifications (ISO 9001 & 14001)",
            "companyValue": "ISO 9001, ISO 14001",
            "status": "PASS",
            "remarks": "Meets certification criteria."
        },
        {
            "requirement": "Financial Capability (No loss for 3 out of 5 years)",
            "companyValue": "Not Available",
            "status": "NOT_AVAILABLE",
            "remarks": "Not mentioned in profile."
        },
        {
            "requirement": "Mandatory documents (Affidavits, Undertakings, Banker's Certificate)",
            "companyValue": "GST, PAN, MSME",
            "status": "FAIL",
            "remarks": "Missing mandatory tender-specific documentation like Annexures A, B, C, D, E, F, G and notary requirements."
        },
        {
            "requirement": "Technical capability",
            "companyValue": "Civil Infra",
            "status": "PASS",
            "remarks": "Industry alignment is appropriate."
        }
    ],
    "missingRequirements": [
        "Affidavit for NIT (Annexure A)",
        "Site visit declaration (Annexure B)",
        "Undertaking regarding Constitution of Firm (Annexure C)",
        "Local Content Declaration (Annexure D)",
        "EMD BG Format (Annexure E)",
        "Banker’s Certificate/Net Worth Certificate (Annexure F)",
        "SDPBG Format (Annexure G)",
        "No loss certificate certified by CA",
        "Notarized power of attorney"
    ],
    "recommendation": "Review Carefully"
};

    const getStarIcon = useCallback((recommendation: string) => {
        if (recommendation === 'Strongly Recommended' || recommendation === 'Recommended') return <Star size={16} className="text-yellow-500" />
    }, []);

    const getEligibleCriteria = useCallback((text: string) => {
        if (text === 'ELIGIBLE') {
            return 'Eligible to Bid'
        } else if (text === 'PARTIALLY_ELIGIBLE') {
            return 'Partially Eligible to Bid'
        } else if (text === 'NOT_ELIGIBLE') {
            return 'Not Eligible to Bid'
        } else {
            return text;
        }
    }, []);

    return (
        <Card className="w-full mt-6 p-4">
            <ComplianceHeader />
            <Separator />
            <div className="grid grid-cols-4 gap-4">
                <ComplianceCard
                    title="Overall Score"
                    value={`${complianceData.score}%`}
                />
                <ComplianceCard
                    title="Eligibility"
                    value={getEligibleCriteria(complianceData.eligible)}
                />
                <ComplianceCard
                    title="Total Checks"
                    value={complianceData?.checks?.length || 0}
                />
                <ComplianceCard
                    title="Missing Items"
                    value={complianceData?.missingRequirements?.length || 0}
                />
            </div>
            <AppSummary label="AI Summary" text={complianceData.summary} />
            <ComplianceCheckTable complianceCheck={complianceData.checks as ComplianceCheck[]} />
            <AppListContent label="Missing Requirements" items={complianceData.missingRequirements} />
            <CardContent className="mt-2">
                <div className="text-base font-bold mb-1">{'AI Recommendation'}</div>
                <Separator />
                <div className="flex mt-2 font-medium">{getStarIcon(complianceData.recommendation)}<span className="ml-2">{complianceData.recommendation}</span></div>
            </CardContent>
        </Card>
    )
}