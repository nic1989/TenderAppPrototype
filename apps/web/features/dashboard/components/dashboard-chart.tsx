import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { DashboardRecommendationSummary, DashboardStatusSummary } from "../types/dashboard.types"
import DonutChart from "@/components/charts/donut-chart";
import SummaryCard from "./summary-card";
import { FileText, ThumbsUp } from "lucide-react";

interface TenderChartProps {
    statusSummary: DashboardStatusSummary[];
    recommendationSummary: DashboardRecommendationSummary[]
}

export default function DashboardCharts({statusSummary, recommendationSummary}: TenderChartProps) {
    const statusData = statusSummary?.map((item) => ({
        name: item.status,
        count: item.count,
    }));

    const recommendationData = recommendationSummary?.map((item) => ({
        name: item.decision,
        count: item.count,
    }));
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard Analytics</CardTitle>                
            </CardHeader>

            <CardContent className="grid gap-6 lg:grid-cols-2">
                
                {statusSummary?.length > 1 ? (
                    <CardDescription>
                        <CardTitle className="text-center">Tender Status</CardTitle>
                        <DonutChart chartData={statusData} />
                    </CardDescription>
                ) : 
                    <SummaryCard
                        title="Tender Status"
                        label={statusSummary?.[0]?.status}
                        count={statusSummary?.[0]?.count ?? 0}
                        icon={FileText}
                    />
                }
                
                {recommendationSummary?.length > 1 ? (
                    <CardDescription>
                        <CardTitle className="text-center">Recommendation</CardTitle>
                        <DonutChart chartData={recommendationData} />
                    </CardDescription>
                ) :
                    <SummaryCard
                        title="Recommendation"
                        label={recommendationSummary?.[0]?.decision}
                        count={recommendationSummary?.[0]?.count ?? 0}
                        icon={ThumbsUp}
                    />
                }
            </CardContent>
        </Card>
    )
}