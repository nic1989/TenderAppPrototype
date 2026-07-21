import { Injectable, NotFoundException, BadRequestException, HttpException } from "@nestjs/common";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";
import { buildTenderChatPrompt } from "../prompts/tender-chat.prompt";

@Injectable()
export class AiChatService {
    constructor(
        private readonly tenderRepository: TenderRepository,
        private readonly aiAnalysisRepository: AiAnalysisRepository,
        private readonly geminiProvider: GeminiProvider
    ) {}

    async chat(tenderId: string, question: string) {
        try {
            const tender = await this.tenderRepository.findById(tenderId);

            if (!tender) {
                throw new NotFoundException('Tender not found.');
            }

            const analysis = await this.aiAnalysisRepository.findByTenderId(tenderId);
        
            if (!analysis) {
                throw new NotFoundException(
                    'Analysis not found',
                );
            }

            const extractedText = analysis?.extractedText || '';
            if (!extractedText.trim()) {
                throw new BadRequestException(
                    `No readable text found for the ${tender.title} tender document`,
                );
            }

            const prompt = buildTenderChatPrompt(extractedText, question);
            const response = await this.geminiProvider.analyze(prompt);

            return {
                answer: response
            }
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
    
            throw new BadRequestException(
                err?.message ??
                'AI returned an invalid response.',
            );
        }
    }
}