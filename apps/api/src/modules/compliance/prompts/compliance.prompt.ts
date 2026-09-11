import { CompanyProfile } from "@prisma/client";

export function buildCompliancePrompt(tenderText: string, companyProfile: string) {
  return `
You are an expert procurement consultant specializing in government tenders.

Your task is to compare the company's profile against the tender requirements and determine whether the company is eligible to participate.

Use ONLY the information provided below.

Do NOT assume or invent any missing information.

If a requirement is not mentioned in either the tender or the company profile, return "Not Available".

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not include code fences.
Do not include introductory or trailing text.

The response MUST be parseable by JSON.parse().

Evaluate the following areas:

- Company eligibility
- Minimum turnover
- Experience
- Certifications
- Mandatory documents
- Technical capability
- Financial capability

For each requirement, return one of the following statuses:

- PASS
- FAIL
- NOT_AVAILABLE

Overall eligibility:

Return:

- ELIGIBLE
- PARTIALLY_ELIGIBLE
- NOT_ELIGIBLE

Overall score:

Return an integer from 0 to 100.

Scoring Guidelines:

- Eligibility Requirements (30%)
- Technical Capability (25%)
- Financial Capability (20%)
- Certifications & Documents (15%)
- Experience (10%)

Recommendation:

Return ONLY one of:

- Strongly Recommended
- Recommended
- Review Carefully
- Not Recommended

Return exactly this schema:

{
  "eligible": "ELIGIBLE",

  "score": 0,

  "summary": "",

  "checks": [
    {
      "requirement": "",
      "companyValue": "",
      "status": "PASS",
      "remarks": ""
    }
  ],

  "missingRequirements": [],

  "recommendation": ""
}

Tender Document:

${tenderText}

--------------------------------------------------

Company Profile:

${companyProfile}
`;
}

export function buildCompanyProfile(profile: CompanyProfile): string {
    return `
        Company Name: ${profile.companyName}
        Turnover: ${profile.turnover}
        Experience: ${profile.experience}
        Certifications: ${(profile.certifications as string[] ?? []).join(', ')}
        Documents: ${(profile.documents as string[] ?? []).join(', ')}
        EmployeeCount: ${profile.employeeCount}
        GSTNumber: ${profile.gstNumber}
        PANNumber: ${profile.panNumber}
        Industry: ${profile?.industry || ''}
        Website: ${profile?.website || ''}
    `;
}