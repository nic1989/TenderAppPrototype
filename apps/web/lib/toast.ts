import { toast } from "sonner";

export const appToast = {
    success: (message: string) => toast.success(message),

    error: (message: string) =>
        toast.error(message, {
            duration: Infinity,
        }),

    warning: (message: string) =>
        toast.warning(message, {
            duration: Infinity,
        }),

    loading: (message: string) =>
        toast.loading(message, {
            duration: Infinity,
        }),
};