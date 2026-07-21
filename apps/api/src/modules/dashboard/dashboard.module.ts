import { Module } from "@nestjs/common";
import { PrismaModule } from "@app-prisma/prisma.module";
import { DashboardController } from "./controllers/dashboard.controller";
import { DashboardService } from "./services/dashboard.service";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";

@Module({
    imports: [PrismaModule],
    controllers: [DashboardController],
    providers:[
        DashboardService,
        TenderRepository,
        AiAnalysisRepository
    ]
})

export class DashboardModule {}