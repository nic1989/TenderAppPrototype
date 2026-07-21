export interface DashboardResponse {
    overview: DashboardOverview;

    statusSummary: TenderStatusSummary[];

    recommendationSummary: RecommendationSummary[];

    recentTenders: RecentTender[];
}

export interface DashboardOverview {
    totalTenders: number;

    analyzedTenders: number;

    averageScore: number;
}

export interface TenderStatusSummary {
    status: string;

    count: number;
}

export interface RecommendationSummary {
    recommendation: string;

    count: number;
}

export interface RecentTender {
    id: string;

    title: string;

    status: string;

    score: number | null;

    recommendation: string | null;

    analyzedAt: Date | null;

    createdAt: Date;
}