import { useQuery } from "@tanstack/react-query";
import { getTenderById } from "../api/tenders.api";

export function useTenderById(id: string) {
    return useQuery({
        queryKey: ['tender', id],
        queryFn: () => getTenderById(id),
        enabled: !!id,
        staleTime: 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}