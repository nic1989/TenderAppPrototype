import { useQuery } from "@tanstack/react-query";
import { getTenderAnalysisById } from "@/features/tenders/api/tenders.api";


export function useTenderAnalysis(id: string) {
    return useQuery({
        queryKey: ['tenderAnalysis', id],
        queryFn: () => getTenderAnalysisById(id),
        enabled: !!id,
        staleTime: 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}