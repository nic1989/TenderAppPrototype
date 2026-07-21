import { Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import { TenderRepository } from '@modules/tenders/repositories/tender.repository';
import { GeminiProvider } from '@modules/ai-analysis/providers/gemini.provider';
import { buildComparisonPrompt } from '../prompts/comparison.prompt';
import { ComparisonResponse } from '../interfaces/comparison-response.interface';

@Injectable()
export class TenderComparisonService {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly geminiProvider: GeminiProvider,
  ) {}

  async compare(tenderIds: string[]): Promise<ComparisonResponse> {
    const tenders = await this.tenderRepository.findByIds(tenderIds);

    if (!tenders.length) {
      throw new NotFoundException(
        'No tenders found.',
      );
    }

    if (tenders.length !== tenderIds.length) {
      throw new BadRequestException(
        'One or more tender IDs are invalid.',
      );
    }

    const notAnalyzed = tenders.filter(tender => !tender.analyses || tender.analyses.length === 0);

    if (notAnalyzed.length) {
        throw new BadRequestException(
            'All selected tenders must be analyzed before comparison.',
        );
    }

    const comparisonData = tenders.map((tender) => {
        const analysis = tender.analyses[0];
        return {
            title: tender.title,
            status: tender.status,
            score: analysis.score,
            summary: analysis.summary,
            recommendation: analysis.recommendation,
            risks: analysis.risks
        }
    });

    const prompt = buildComparisonPrompt(JSON.stringify(comparisonData, null, 2));

    const response = await this.geminiProvider.analyze(prompt);

    try {
      return JSON.parse(response);
    } catch {
      throw new BadRequestException(
        'AI returned invalid JSON.',
      );
    }
  }
}