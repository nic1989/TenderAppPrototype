import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (value: boolean) => void;
    compactMode: boolean;
    pageSize: number;
}

export const useLayoutStore = create<LayoutState>()(
    persist(
        (set) => ({
            sidebarOpen: false,
            compactMode: false,
            pageSize: 10,
            toggleSidebar: () =>
                set((state) => ({
                sidebarOpen: !state.sidebarOpen,
                })),

            setSidebarOpen: (value) =>
                set({
                sidebarOpen: value,
                }),
        }),
        {
            name: "layout-store",
            partialize: (state) => ({
                sidebarOpen: state.sidebarOpen
            }),
        }
    )
);