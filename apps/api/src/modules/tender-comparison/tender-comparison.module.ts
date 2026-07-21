import { Module } from "@nestjs/common";
import { PrismaModule } from "@app-prisma/prisma.module";
import { TenderComparisonController } from "./controllers/tender-comparison.controller";
import { TenderComparisonService } from "./services/tender-comparison.service";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";

@Module({
    imports: [PrismaModule],
    controllers: [TenderComparisonController],
    providers: [
        TenderComparisonService,
        TenderRepository,
        GeminiProvider
    ]
})

export class TenderComparisonModule {}