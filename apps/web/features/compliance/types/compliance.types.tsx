export type ComplianceEligibility = "ELIGIBLE" | "PARTIALLY_ELIGIBLE" | "NOT_ELIGIBLE";

export type ComplianceStatus = "PASS" | "FAIL" | "NOT_AVAILABLE";

export interface ComplianceCheck {
  requirement: string;
  companyValue: string;
  status: ComplianceStatus;
  remarks: string;
}

export interface ComplianceResponse {
  eligible: ComplianceEligibility;
  score: number;
  summary: string;
  checks: ComplianceCheck[];
  missingRequirements: string[];
  recommendation: string;
}