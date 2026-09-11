import { api } from "@/lib/api";
import { CompanyProfile, CompanyProfileRequest } from "../types/profile.type";

export const getCompanyProfile = async (): Promise<CompanyProfile> => {
    const response = await api.get('/company-profile');
    return response.data;
}

export const createProfile = async(data: CompanyProfileRequest) => {
    console.log('api data');
}

export const updateProfile = async(data: CompanyProfileRequest) => {
    console.log('update api data');
}