import { api } from "@/lib/api";
import { Tender, TenderAnalysis } from "../types/tender.types";
import { TenderChat } from "@/features/tender-chat/types/chat.types";
import { ComplianceResponse } from "@/features/compliance/types/compliance.types";

export const getTenders = async(): Promise<Tender[]> => {
    const response = await api.get('/tenders');
    return response.data;
}

export const getTenderById = async(id: string): Promise<Tender> => {
    const response = await api.get(`/tenders/${id}`);
    return response.data;
}

export const getTenderAnalysisById = async(id: string): Promise<TenderAnalysis> => {
    const response = await api.get(`/tenders/${id}/analysis`);
    return response.data;
}

export const tenderComplianceById = async(id: string): Promise<ComplianceResponse> => {
    const response = await api.post(`/tenders/${id}/compliance`);
    return response.data;
}

export const tenderChat = async(id: string, data: TenderChat) => {
    const response = await api.post(`/tenders/${id}/chat`, data);
    return response.data;
}