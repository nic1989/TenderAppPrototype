import { Module } from "@nestjs/common";
import { PrismaModule } from "@app-prisma/prisma.module";
import { ComplianceController } from "./controllers/compliance.controller";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";
import { ComplianceService } from "./services/compliance.service";
import { CompanyProfileRepository } from "@modules/company-profile/repositories/company-profile.repository";

@Module({
    imports: [PrismaModule],
    controllers: [ComplianceController],
    providers: [
        ComplianceService,
        TenderRepository,
        AiAnalysisRepository,
        GeminiProvider,
        CompanyProfileRepository
    ]
})

export class ComplianceModule {}