import { Tender, TenderAnalysis } from "@prisma/client";

export function buildAnalysisReport(tender: Tender, analysis: TenderAnalysis) {
  return {
  
    title: tender.title,
    status: tender.status,
    analyzedAt: analysis.analyzedAt,
    aiModel: analysis.aiModel,
    processingTime: analysis.processingTime,
    score: analysis.score,
    summary: analysis.summary,
    eligibility: analysis.eligibility,
    technicalRequirements: analysis.technicalRequirements,
    financialRequirements: analysis.financialRequirements,
    importantDates: analysis.importantDates,
    risks: analysis.risks,
    recommendation: analysis.recommendation
};
}