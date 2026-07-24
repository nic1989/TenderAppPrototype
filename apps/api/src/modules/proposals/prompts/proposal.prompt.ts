import { CompanyProfile, Tender, TenderAnalysis } from '@prisma/client';

export function buildProposalPrompt(
  tender: Tender,
  analysis: TenderAnalysis,
  companyProfile: CompanyProfile,
): string {
  return `
You are a senior government procurement consultant and proposal writer.

Your task is to prepare a professional bid proposal that is suitable for submission to a government or enterprise client.

Use ONLY the information provided below.

Do NOT invent facts, certifications, manpower, project experience, financial capability, or technical capabilities.

If information is unavailable, mention it in the "assumptions" section instead of making assumptions.

The proposal should:

- Sound professional and persuasive.
- Be written in business English.
- Be concise but detailed.
- Be suitable for a government tender submission.
- Never mention AI or automated analysis.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not include code fences.
The response MUST be parseable using JSON.parse().

==================================================
Tender Information
==================================================

Title:
${tender.title}

Status:
${tender.status}

==================================================
Tender Analysis
==================================================

Summary:
${analysis.summary}

Eligibility:
${JSON.stringify(analysis.eligibility)}

Technical Requirements:
${JSON.stringify(analysis.technicalRequirements)}

Financial Requirements:
${JSON.stringify(analysis.financialRequirements)}

Important Dates:
${JSON.stringify(analysis.importantDates)}

Risks:
${JSON.stringify(analysis.risks)}

Tender Score:
${analysis.score}

Recommendation:
${JSON.stringify(analysis.recommendation)}

==================================================
Company Profile
==================================================

Company Name:
${companyProfile.companyName}

Industry:
${companyProfile.industry ?? ""}

Website:
${companyProfile.website ?? ""}

GST Number:
${companyProfile.gstNumber ?? ""}

Turnover:
${companyProfile.turnover ?? ""}

Experience:
${companyProfile.experience ?? ""}

Employee Count:
${companyProfile.employeeCount ?? ""}

Certifications:
${JSON.stringify(companyProfile.certifications)}

Available Documents:
${JSON.stringify(companyProfile.documents)}

==================================================
Instructions
==================================================

Generate the following sections.

1. Executive Summary
- Around 200 words.
- Explain the opportunity.
- Explain why the company is suitable.

2. Company Introduction
- 150-200 words.
- Use ONLY supplied company information.

3. Project Understanding
- Explain project objectives.
- Mention expected deliverables.
- Mention technical expectations.

4. Technical Approach

Return 5-8 items.

Each item should contain:

- title
- description

5. Implementation Methodology

Return 5-8 phases.

Each phase should contain:

- title
- description

6. Key Deliverables

Return 5-10 deliverables.

7. Project Timeline

Return implementation phases.

Each phase should contain:

- phase
- duration

Do NOT invent calendar dates.

8. Risk Mitigation

Return 3-6 items.

Each item should contain:

- title
- mitigation

9. Compliance Statement

Write one professional paragraph describing whether the company appears capable of meeting the tender requirements based ONLY on the supplied company profile.

If information is insufficient, clearly state that additional verification is recommended before submission.

10. Commercial Section

Return:

- pricingStrategy
- paymentTerms
- commercialConsiderations

Do NOT invent prices.

11. Assumptions

Return a list of assumptions made because information was unavailable.

12. Conclusion

One professional closing paragraph.

13. Declaration

Generate a standard proposal declaration suitable for a government tender.

==================================================
Return EXACTLY this JSON
==================================================

{
  "executiveSummary": "",
  "companyIntroduction": "",
  "projectUnderstanding": "",

  "technicalApproach": [
    {
      "title": "",
      "description": ""
    }
  ],

  "implementationMethodology": [
    {
      "title": "",
      "description": ""
    }
  ],

  "keyDeliverables": [],

  "projectTimeline": [
    {
      "phase": "",
      "duration": ""
    }
  ],

  "riskMitigation": [
    {
      "title": "",
      "mitigation": ""
    }
  ],

  "complianceStatement": "",

  "commercial": {
    "pricingStrategy": "",
    "paymentTerms": "",
    "commercialConsiderations": []
  },

  "assumptions": [],

  "conclusion": "",

  "declaration": ""
}
`;
}