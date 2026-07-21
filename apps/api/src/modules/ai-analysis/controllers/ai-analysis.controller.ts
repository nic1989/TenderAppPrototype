import { Controller, Post, Get, Delete, Param, UseGuards, Res } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { AiAnalysisService } from '../services/ai-analysis.service';

@Controller('tenders/:id/analysis')
@UseGuards(JwtAuthGuard)
export class AiAnalysisController {
    constructor(private readonly aiAnalysisService: AiAnalysisService) { }

    /**
     * Analyze Tender
     * POST /tenders/:id/analysis
     */
    @Post()
    analyze(@Param('id') tenderId: string) {
        return this.aiAnalysisService.analyze(tenderId);
    }

    /**
     * Get Analysis
     * GET /tenders/:id/analysis
     */
    @Get()
    getAnalysis(@Param('id') tenderId: string) {
        return this.aiAnalysisService.findByTenderId(tenderId);
    }

    /**
     * Delete Analysis
     * DELETE /tenders/:id/analysis
     */
    @Delete()
    deleteAnalysis(@Param('id') tenderId: string) {
        return this.aiAnalysisService.deleteByTenderId(tenderId);
    }

    /**
     * PDF Analysis
     * GET /tenders/:id/analysis/pdf
     */
    @Get('/pdf')
    downloadPdf(@Param('id') tenderId: string, @Res() res: any) {
        return this.aiAnalysisService.downloadPdf(
            tenderId,
            res,
        );
    }
}