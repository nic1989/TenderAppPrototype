import { Controller, UseGuards, Post, Param, Body } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { AiChatService } from "../services/ai-chat.service";
import { AskQuestionDto } from "../dto/ask-question.dto";

@Controller('/tenders/:id/chat')
@UseGuards(JwtAuthGuard)
export class AiChatController {
    constructor (
        private readonly aiChatServices: AiChatService
    ) {}

    /**
     * Tender Chat
     * POST /tenders/:id/chat
     */
    @Post()
    startChat(@Param('id') tenderId: string, @Body() req: AskQuestionDto) {
        return this.aiChatServices.chat(tenderId, req.question);
    }
}