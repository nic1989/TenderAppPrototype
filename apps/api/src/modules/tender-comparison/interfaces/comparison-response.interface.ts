export interface ComparisonResponse {
    bestTender: string;

    comparison: TenderComparison[];

    overallRecommendation: string;
}

export interface TenderComparison {
    title: string;

    score: number;

    recommendation: string;

    strengths: string[];

    weaknesses: string[];
}