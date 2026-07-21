export function buildTenderChatPrompt(extractedText: string, question: string) {
    return `
    You are an expert procurement assistant.

    Answer the user's question ONLY using the tender information below.

    If the answer is not available in the tender document, respond with:

    "I couldn't find that information in the tender."

    Tender Information:

    ${extractedText}

    Question:

    ${question}

    Answer:
`;
}