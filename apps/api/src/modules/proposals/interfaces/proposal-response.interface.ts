export interface ProposalResponse {
  executiveSummary: string;
  companyIntroduction: string;
  projectUnderstanding: string;

  technicalApproach: ProposalSection[];

  implementationMethodology: ProposalSection[];

  keyDeliverables: string[];

  projectTimeline: TimelineItem[];

  riskMitigation: RiskMitigation[];

  complianceStatement: string;

  commercial: CommercialSection;

  assumptions: string[];

  conclusion: string;

  declaration: string;
}

export interface ProposalSection {
  title: string;
  description: string;
}

export interface TimelineItem {
  phase: string;
  duration: string;
}

export interface RiskMitigation {
  title: string;
  mitigation: string;
}

export interface CommercialSection {
  pricingStrategy: string;
  paymentTerms: string;
  commercialConsiderations: string[];
}