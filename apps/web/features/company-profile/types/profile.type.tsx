export interface CompanyProfile {
  companyName: string;
  turnover: number;
  experience: number;
  certifications: string[];
  documents: string[];
  employeeCount: number;
  gstNumber: string;
  industry: string;
  panNumber: string;
  website: string;
}

export interface CompanyProfileRequest {
  companyName: string;
  turnover: string;
  experience: string;
  certifications: string[];
  documents: string[];
  employeeCount: number;
  gstNumber: string;
  industry: string;
  panNumber: string;
  website?: string;
}
