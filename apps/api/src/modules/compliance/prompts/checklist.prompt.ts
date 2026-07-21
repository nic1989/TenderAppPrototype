export function buildChecklistPrompt(tenderText: string): string {

    return `
You are an expert government tender consultant.

Analyze the tender document and prepare a complete bid submission checklist.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not include code fences.
The response MUST be parseable by JSON.parse().

If information is unavailable:

- Return [] for arrays.
- Return "" for strings.

Return exactly this schema:

{
  "overallReadiness": 0,

  "mandatoryDocuments": [
    {
      "document": "",
      "mandatory": true,
      "remarks": ""
    }
  ],

  "technicalDocuments": [],

  "financialDocuments": [],

  "submissionChecklist": [],

  "importantReminders": []
}

Guidelines:

overallReadiness:
Estimate how complete the tender documentation appears on a scale of 0-100.

mandatoryDocuments:
Include mandatory certificates, declarations, registrations, affidavits, annexures, EMD, bank guarantees, power of attorney, etc.

technicalDocuments:
Include all technical proposal requirements.

financialDocuments:
Include BOQ, financial bid, turnover certificates, audited balance sheets, CA certificates, etc.

submissionChecklist:
Provide a sequential checklist before final submission.

importantReminders:
Mention submission deadlines, digital signatures, EMD payment, portal registration, validity period, and other critical reminders.

Tender Document:

${tenderText}
`;
}