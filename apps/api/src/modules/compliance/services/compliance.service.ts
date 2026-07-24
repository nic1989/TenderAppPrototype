import { Injectable, BadRequestException, NotFoundException, HttpException } from "@nestjs/common";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";
import { buildCompanyProfile, buildCompliancePrompt } from "../prompts/compliance.prompt";
import { ComplianceResponse } from "../interfaces/compliance.interface";
import { buildChecklistPrompt } from "../prompts/checklist.prompt";
import { ChecklistResponse } from "../interfaces/checklist.interface";
import { CompanyProfileRepository } from "@modules/company-profile/repositories/company-profile.repository";

@Injectable()
export class ComplianceService {
    constructor(
        private readonly tenderRepository: TenderRepository,
        private readonly aiAnalysisRepository: AiAnalysisRepository,
        private readonly geminiProvider: GeminiProvider,
        private readonly companyProfileRepository: CompanyProfileRepository
    ) {}

    public async verify(tenderId: string, userId: string): Promise<ComplianceResponse> {
        return this.generateCompliance(tenderId, userId);
    }

    async generateCompliance(tenderId: string, userId: string) {
        try {
            const companyProfile = await this.companyProfileRepository.findByUserId(userId);
            if (!companyProfile) {
                throw new NotFoundException(
                    'Complete the Company profile to generate compliance record.',
                );
            }
            const extractedText: string = await this.checkTenderExistAndGetExtractedText(tenderId);
            const companyProfileText = buildCompanyProfile(companyProfile);
            const prompt = buildCompliancePrompt(extractedText, companyProfileText)
            const response = await this.geminiProvider.analyze(prompt);
           
            let compliance: ComplianceResponse;
            try {
                compliance = JSON.parse(response);
            } catch {
                throw new BadRequestException(
                    'AI returned invalid JSON.',
                );
            }
            return compliance;
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

    async checklist(tenderId: string) {
        const extractedText: string = await this.checkTenderExistAndGetExtractedText(tenderId);
        
        const prompt = buildChecklistPrompt(extractedText ?? '');

        const response = await this.geminiProvider.analyze(prompt);

        let checklist: ChecklistResponse;

        try {
            checklist = JSON.parse(response);
        } catch {
            throw new BadRequestException(
                'AI returned invalid JSON.',
            );
        }

        return checklist;
    }

    async checkTenderExistAndGetExtractedText(tenderId: string) {
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
        return extractedText;
    }
}