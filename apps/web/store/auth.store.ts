import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cookie } from "@/lib/cookie";

interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User) => void;
    setAuthenticated: (value: boolean) => void;
    setLoading(value: boolean): void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false
                }),
            setAuthenticated: (value) =>
                set({
                    isAuthenticated: value,
                }),
            logout: () => {
                cookie.removeToken();
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                })
            },
            setLoading: (value) =>
                set({
                    isLoading: value,
                })
        }),
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading
            }),
        }
    )
);