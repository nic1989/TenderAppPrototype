import { api } from "@/lib/api";
import { DashboardResponse } from "../types/dashboard.types";

export const getDashboardData = async (): Promise<DashboardResponse> => {
    const response = await api.get("/dashboard");

    return response.data;
}