export interface TenderDocument {
  id: string;
  orgFileName: string;
  fileName: string;
  mimeType: string;
  filePath: string;
  fileSize: number;
  documentType: string;
  createdAt: string;
}

export interface TenderAnalysis {
  eligibility: [];
  extractedText: string;
  financialRequirements: [];
  importantDates: TenderImportantDates;
  recommendation: TenderRecommendation;
  recommendationDecision: string;
  risks: [];
  score: number;
  summary: string;
  technicalRequirements: [];
  createdAt: string;
  analyzedAt: string;
}

export interface TenderRecommendation {
  confidence: string;
  decision: string;
  estimatedEffort: string;
  reasons: []
}

export interface TenderImportantDates {
  closingDate: string;
  openingDate: string;
  preBidMeeting: string;
  publicationDate: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  createdById: string;
  documents: TenderDocument[];
  analyses: TenderAnalysis[];
}