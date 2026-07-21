export function buildComparisonPrompt(tenders: string): string {

return `
You are an expert procurement consultant.

Compare the following tenders.

Return ONLY valid JSON.

No markdown.
No explanations.
No code fences.

Return exactly:

{
  "bestTender": "",
  "comparison": [
    {
      "title": "",
      "score": 0,
      "recommendation": "",
      "strengths": [],
      "weaknesses": []
    }
  ],
  "overallRecommendation": ""
}

Comparison Data:

${tenders}
`;
}