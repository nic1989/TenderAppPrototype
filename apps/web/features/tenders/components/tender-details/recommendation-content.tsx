import { CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import { getStatusColor } from "@/components/icons/badge-class";
import { TenderAnalysis } from "../../types/tender.types";
import { formatDate } from "@/utils/utilities";

interface AnalysisProps {
    analysis: TenderAnalysis
}

export default function RecommendationContent({analysis}: AnalysisProps) {
    return (
        <CardContent className="flex justify-between">
            <div className="grid grid-cols-2 gap-2 w-[30%]">
                <span>AI Recommendation:</span>
                <span className="flex"><Badge className={`${getStatusColor(analysis.recommendationDecision?.toLowerCase())}`} />&nbsp;{analysis.recommendationDecision}</span>
                <span>Score:</span>
                <span>{analysis.score} / 100</span>
                <span>Confidence:</span>
                <span>{analysis.recommendation?.confidence}</span>
                <span>Analyzed:</span>
                <span>{formatDate(analysis.analyzedAt)}</span>
            </div>
        </CardContent>
    )
}