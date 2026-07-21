import { Module } from "@nestjs/common";
import { PrismaModule } from "@app-prisma/prisma.module";
import { AiChatController } from "./controllers/ai-chat.controller";
import { AiChatService } from "./services/ai-chat.service";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";
import { GeminiProvider } from "@modules/ai-analysis/providers/gemini.provider";

@Module({
    imports: [PrismaModule],
    controllers: [AiChatController],
    providers: [
        AiChatService,
        TenderRepository,
        AiAnalysisRepository,
        GeminiProvider
    ]
})

export class AiChatModule {}