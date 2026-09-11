export interface DashboardOverview {
  totalTenders: number;
  analyzedTenders: number;
  averageScore: number;
}

export interface DashboardStatusSummary {
  status: string;
  count: number;
}

export interface DashboardRecommendationSummary {
  decision: string;
  count: number;
}

export interface DashboardRecentTender {
  id: string;
  title: string;
  status: string;
  score: number | null;
  recommendation: string | null;
  analyzedAt: string | null;
  createdAt: string;
}

export interface DashboardResponse {
  overview: DashboardOverview;
  statusSummary: DashboardStatusSummary[];
  recommendationSummary: DashboardRecommendationSummary[];
  recentTenders: DashboardRecentTender[];
}