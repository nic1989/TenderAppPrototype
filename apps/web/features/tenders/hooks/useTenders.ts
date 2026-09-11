import { useQuery } from "@tanstack/react-query";
import { getTenders } from "../api/tenders.api";

export function useTenders() {
    return useQuery({
        queryKey: ['tenders'],
        queryFn: getTenders,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
    })
}