import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth.api";

export function useProfile(enabled: boolean) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  });
}