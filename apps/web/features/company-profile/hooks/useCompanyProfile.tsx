import { useQuery } from "@tanstack/react-query";
import { getCompanyProfile } from "../api/profile.api";

export function useCompanyProfile() {
    return useQuery({
        queryKey: ['companyProfile'],
        queryFn: getCompanyProfile,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
    })
}