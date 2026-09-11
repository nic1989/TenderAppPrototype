import { tenderComplianceById } from "@/features/tenders/api/tenders.api";
import { useQuery } from "@tanstack/react-query";

export function useCompliance(id: string) {
    return useQuery({
        queryKey: ['compliance', id],
        queryFn: () => tenderComplianceById(id),
        enabled: !!id,
        staleTime: 60 * 100,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 0
    })
}