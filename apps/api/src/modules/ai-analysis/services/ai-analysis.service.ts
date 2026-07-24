import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { AiAnalysisRepository } from '../repositories/ai-analysis.repository';
import { TenderRepository } from '@modules/tenders/repositories/tender.repository';
import { TenderDocumentRepository } from '@modules/tenders/repositories/tender-document.repository';
import { PdfParserService } from '../parsers/pdf.parser';
import { OpenAiProvider } from '../providers/openai.provider';
import { GeminiProvider } from '../providers/gemini.provider';
import { buildTenderAnalysisPrompt } from '../prompts/tender-analysis.prompt';
import { TenderAnalysisResponse } from '../interfaces/analysis-response.interface';
import { ConfigService } from '@nestjs/config';
import { PdfReportService } from '../reports/pdf-report.service';
import { buildAnalysisReport } from '../templates/analysis-report.template';

@Injectable()
export class AiAnalysisService {
  constructor(
    private readonly aiAnalysisRepository: AiAnalysisRepository,
    private readonly tenderRepository: TenderRepository,
    private readonly tenderDocumentRepository: TenderDocumentRepository,
    private readonly pdfParserService: PdfParserService,
    private readonly openAiProvider: OpenAiProvider,
    private readonly geminiProvider: GeminiProvider,
    private readonly configService: ConfigService,
    private readonly pdfReportService: PdfReportService
  ) {}

  async analyze(tenderId: string) {
    try {
        const tender = await this.tenderRepository.findById(tenderId);

        if (!tender) {
            throw new NotFoundException('Tender not found.');
        }

        const documents = await this.tenderDocumentRepository.findByTenderId(tenderId);

        if (!documents.length) {
            throw new NotFoundException(
                'No documents found',
            );
        }

        const extractedTexts = await Promise.all(
            documents.map(async (document) => {
                const text = await this.pdfParserService.extractText(document.filePath);
                return `
                    ==============================
                    Document: ${document.orgFileName}
                    ==============================

                    ${text}
                `;
            }),
        );
        const MAX_CHARS = 300000;
        let extractedText = extractedTexts.join('\n');
        if (!extractedText.trim()) {
            throw new BadRequestException(
                'No readable text found in the uploaded document.',
            );
        }
        if (extractedText.length > MAX_CHARS) {
            extractedText = extractedText.substring(0, MAX_CHARS);
        }
        const prompt = buildTenderAnalysisPrompt(extractedText);
        const startTime = Date.now();
        const response = await this.geminiProvider.analyze(prompt);
        let analysis: TenderAnalysisResponse;
        try {
            analysis = JSON.parse(response);
        } catch {
            throw new BadRequestException(
                'AI returned invalid JSON.',
            );
        }
        const processingTime = (Date.now() - startTime) / 1000;
        const analysisData = {
            extractedText,
            summary: analysis.summary ?? '',
            eligibility: analysis.eligibility ?? [],
            technicalRequirements: analysis.technicalRequirements ?? [],
            financialRequirements: analysis.financialRequirements ?? [],
            importantDates: analysis.importantDates ?? {},
            risks: analysis.risks ?? [],
            score: analysis.score ?? 0,
            recommendation: analysis.recommendation,
            recommendationDecision: analysis.recommendation.decision,
            aiModel: this.configService.get('GEMINI_MODEL'),
            analyzedAt: new Date(),
            processingTime,
        };

        const existing = await this.aiAnalysisRepository.findByTenderId(tenderId);
        if (existing) {
            return await this.aiAnalysisRepository.update(
                tenderId,
                analysisData
            );
        }

        return await this.aiAnalysisRepository.create({
            tenderId,
            ...analysisData
        });

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

  findByTenderId(tenderId: string) {
    return this.aiAnalysisRepository.findByTenderId(tenderId);
  }

  async deleteByTenderId(tenderId: string) {
    try {
        await this.aiAnalysisRepository.deleteByTenderId(tenderId);
        return {
            message: 'Analysis deleted successfully.',
        };
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  async downloadPdf(tenderId: string, res: any) {
    const tender = await this.tenderRepository.findById(tenderId);

    if (!tender) {
        throw new NotFoundException(
            'Tender not found',
        );
    }

    const analysis = await this.aiAnalysisRepository.findByTenderId(tenderId);

    if (!analysis) {
        throw new NotFoundException(
            'Analysis not found',
        );
    }

    const report = buildAnalysisReport(tender, analysis);

    return this.pdfReportService.generate(
        report,
        res,
    );
}
}