import { Module } from "@nestjs/common";
import { PrismaModule } from "@app-prisma/prisma.module";
import { PropsalController } from "./controllers/proposal.controller";
import { ProposalService } from "./services/proposal.service";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";
import { CompanyProfileRepository } from "@modules/company-profile/repositories/company-profile.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";
import { ProposalPdfService } from "./services/proposal-pdf.service";

@Module({
    imports: [PrismaModule],
    controllers: [PropsalController],
    providers: [
        ProposalService,
        TenderRepository,
        AiAnalysisRepository,
        CompanyProfileRepository,
        GeminiProvider,
        ProposalPdfService
    ]
})

export class ProposalModule {}