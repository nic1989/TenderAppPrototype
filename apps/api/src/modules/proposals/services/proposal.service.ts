import { Injectable, NotFoundException, BadRequestException, HttpException } from "@nestjs/common";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";
import { CompanyProfileRepository } from "@modules/company-profile/repositories/company-profile.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";
import { buildProposalPrompt } from "../prompts/proposal.prompt";

@Injectable()
export class ProposalService {
    constructor(
        private readonly tenderRepository: TenderRepository,
        private readonly aiAnalysisRepository: AiAnalysisRepository,
        private readonly companyProfileRepository: CompanyProfileRepository,
        private readonly geminiProvider: GeminiProvider
    ) {}

    async generate(tenderId: string, userId: string) {
        try {
            const tender = await this.tenderRepository.findById(tenderId);
            if (!tender) {
                throw new NotFoundException(
                    'Tender not found.',
                );
            }

            const analysis = await this.aiAnalysisRepository.findByTenderId(tenderId);

            if (!analysis) {
                throw new BadRequestException(
                    'Analyze the tender before generating a proposal.',
                );
            }

            const companyProfile = await this.companyProfileRepository.findByUserId(userId);
            if (!companyProfile) {
                throw new NotFoundException(
                    'Company profile not found.',
                );
            }

            const prompt = buildProposalPrompt(tender, analysis, companyProfile);
            const response = await this.geminiProvider.analyze(prompt);

            try {
                return {
                    proposal: JSON.parse(response),
                    tender,
                    companyProfile
                }
            } catch {
                throw new BadRequestException(
                    'AI returned invalid JSON.',
                );
            }
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
    
            throw new BadRequestException(
                err?.message ??
                'AI returned an invalid JSON response.',
            );
        }
    }
}