"use client";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { LoadingScreen } from "@/features/auth/components/loading-screen";
import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import { DashboardError } from "@/features/dashboard/components/dashboard-error";
import StatsCards from "@/features/dashboard/components/stats-cards";
import RecentTenders from "@/features/dashboard/components/recent-tenders";
import DashboardCharts from "@/features/dashboard/components/dashboard-chart";
import AppBreadcrumbs from "@/components/layout/app-breadcrumbs";

export default function DashboardPage() {
  const dashboard = useDashboard();
  const user = useProfile(true);

  if (dashboard.isLoading) {
    return <LoadingScreen />;
  }

  if (dashboard.isError) {
    return <DashboardError />;
  }

  const data = dashboard?.data;
  const { name} = user.data!;

  return (
    <div className="space-y-8">
      <AppBreadcrumbs head="Dashboard" />
      <DashboardHeader name={name} />

      <StatsCards overview={data?.overview} />

      <DashboardCharts
        statusSummary={data?.statusSummary || []}
        recommendationSummary={data?.recommendationSummary || []}
      />

      <RecentTenders tenders={data?.recentTenders || []} />
    </div>
  );
}