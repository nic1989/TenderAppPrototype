import { useQuery } from "@tanstack/react-query";
import { cookie } from "@/lib/cookie";

import { getDashboardData } from "../api/dashboard.api";

export function useDashboard() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData,
        enabled: cookie.hasToken(),
        retry: 1,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
    })
}