export interface TenderAnalysisResponse {
    summary: string;
    eligibility: string[];
    technicalRequirements: string[];
    financialRequirements: string[];
    importantDates: {
        publicationDate?: string,
        preBidMeeting?: string,
        closingDate?: string;
        openingDate?: string;
    };
    risks: string[];
    score: number;
    recommendation: {
        decision?: string;
        confidence?: string;
        estimatedEffort?: string;
        reasons?: string[];
    }
}