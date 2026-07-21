export interface ChecklistResponse {
    overallReadiness: number;

    mandatoryDocuments: ChecklistItem[];

    technicalDocuments: string[];

    financialDocuments: string[];

    submissionChecklist: string[];

    importantReminders: string[];
}

export interface ChecklistItem {
    document: string;

    mandatory: boolean;

    remarks: string;
}