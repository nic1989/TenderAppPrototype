import { useRouter } from "next/navigation";
import { cookie } from "@/lib/cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = useAuthStore((state) => state.logout);

  return () => {
    cookie.removeToken();
    queryClient.clear();
    logout();
    router.replace("/login");
  };
}