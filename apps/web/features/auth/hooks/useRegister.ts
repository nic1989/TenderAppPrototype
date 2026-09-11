import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { register } from "../api/auth.api";

import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success(
        "Registration successful."
      );

      router.replace("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to register.");
    },
  });
}