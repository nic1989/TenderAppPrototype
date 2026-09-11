import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { login } from "../api/auth.api";
import { cookie } from "@/lib/cookie";
import { useAuthStore } from "@/store/auth.store";

import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      cookie.setToken(response.accessToken);
      setUser(response.user);

      toast.success("Login successful.");
      router.replace("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to login.");
    }
  });
}