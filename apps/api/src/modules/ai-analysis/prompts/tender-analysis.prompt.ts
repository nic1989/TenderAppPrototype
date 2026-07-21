export function buildTenderAnalysisPrompt(tenderText: string): string {
  return `
You are an expert procurement and government tender analyst.

Analyze the tender document below.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not include code fences.
Do not include introductory or trailing text.
Return valid JSON only.
Use double quotes for all property names and string values.
Do not include comments.
Do not include trailing commas.
The response MUST be parseable by JSON.parse().

If any information is not found in the tender document:

- Return "" for strings.
- Return [] for arrays.
- Do not invent or assume information.

Provide an overall tender score from 0 to 100.

Scoring guidelines:

- Eligibility compliance (30%)
- Technical feasibility (25%)
- Financial feasibility (20%)
- Documentation completeness (15%)
- Overall business risk (10%)

Score interpretation:
- 90-100: Excellent opportunity
- 75-89: Good opportunity
- 50-74: Moderate opportunity
- Below 50: High-risk opportunity

The score must be an integer between 0 and 100.
Never omit the score.

Summary should be 150-300 words explaining:

- Scope of work
- Major deliverables
- Important conditions

Risks should include:

- Technical risks
- Financial risks
- Compliance risks
- Timeline risks

technicalRequirements should contain
clear bullet points describing:

- Technologies
- Equipment
- Certifications
- Experience

financialRequirements should contain

- Turnover requirements
- EMD
- Tender fee
- Performance security
- Bank guarantee

"importantDates": {
  "publicationDate": "",
  "preBidMeeting": "",
  "closingDate": "",
  "openingDate": ""
}

Recommendation
   Based on the overall tender analysis, provide a recommendation for whether the organization should bid for this tender.
   The recommendation should consider:
  - Eligibility
  - Technical feasibility
  - Financial commitments
  - Project risks
  - Timeline
  - Overall score

Decision should be ONLY one of:
- "Strongly Recommended"
- "Recommended"
- "Review Carefully"
- "Not Recommended"

Confidence should be ONLY one of:
- "High"
- "Medium"
- "Low"

Reasons should contain 3-5 concise statements explaining why the recommendation was made.

Each reason should be a plain string.

Do not include numbering or markdown bullets.

If any information is unavailable, return an empty string or an empty array.

Return exactly this schema:

{
  "summary": "",
  "eligibility": [],
  "technicalRequirements": [],
  "financialRequirements": [],
  "importantDates": {
    "publicationDate": "",
    "preBidMeeting": "",
    "closingDate": "",
    "openingDate": ""
  },
  "risks": [],
  "score": 0,
  "recommendation": {
      "decision": "",
      "confidence": "",
      "estimatedEffort": "",
      "reasons": []
  }
}

Tender Document:

${tenderText}
`;
}