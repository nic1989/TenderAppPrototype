import { Module } from '@nestjs/common';

import { PrismaModule } from '@app-prisma/prisma.module';
import { TendersModule } from '@modules/tenders/tenders.module';

import { AiAnalysisController } from './controllers/ai-analysis.controller';
import { AiAnalysisService } from './services/ai-analysis.service';
import { AiAnalysisRepository } from './repositories/ai-analysis.repository';

import { PdfParserService } from './parsers/pdf.parser';
import { OpenAiProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { PdfReportService } from './reports/pdf-report.service';

@Module({
  imports: [
    PrismaModule,
    TendersModule,
  ],
  controllers: [
    AiAnalysisController,
  ],
  providers: [
    AiAnalysisService,
    AiAnalysisRepository,
    PdfParserService,
    OpenAiProvider,
    GeminiProvider,
    PdfReportService
  ]
})
export class AiAnalysisModule {}