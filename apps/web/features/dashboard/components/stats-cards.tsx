import { DashboardOverview } from "../types/dashboard.types";
import StatCard from "./stat-card";
import { Brain, FileText, TrendingUp } from "lucide-react";

export default function StatsCards(props: any) {
    const overview: DashboardOverview = props.overview;
    return (
        <div className="mt-6 grid grid-cols-3 gap-4">
            <StatCard
                title="Total Tenders"
                value={overview?.totalTenders || 0}
                icon={FileText} 
            />
            <StatCard
                title="Analyzed Tender"
                value={overview?.analyzedTenders || 0}
                icon={Brain}
            />
            <StatCard
                title="Average Score"
                value={`${overview?.averageScore || 0}%`}
                icon={TrendingUp}
            />
        </div>
    )
}