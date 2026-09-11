import { useQuery } from "@tanstack/react-query";
import { tenderChat } from "@/features/tenders/api/tenders.api";
import { TenderChat } from "../types/chat.types";

export function useTenderChat(id: string, data: TenderChat) {
    return useQuery({
        queryKey: ['tenderChat', id],
        queryFn: () => tenderChat(id, data),
        enabled: !!id && !!data?.question?.trim(),
        staleTime: 0,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}