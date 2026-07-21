export interface ComplianceResponse {
    eligible: 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_ELIGIBLE';

    score: number;

    summary: string;

    checks: ComplianceCheck[];

    missingRequirements: string[];

    recommendation:
        | 'Strongly Recommended'
        | 'Recommended'
        | 'Review Carefully'
        | 'Not Recommended';
}

export interface ComplianceCheck {
    requirement: string;

    companyValue: string;

    status: 'PASS' | 'FAIL' | 'NOT_AVAILABLE';

    remarks: string;
}