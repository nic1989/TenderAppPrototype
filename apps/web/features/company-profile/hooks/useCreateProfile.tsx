import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProfile } from "../api/profile.api";

export function useCreateProfile() {
    return useMutation({
        mutationFn: createProfile,
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Something went wrong.");
        }
    })
}