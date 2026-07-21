import { Injectable, NotFoundException, BadRequestException, HttpException } from "@nestjs/common";
import { TenderRepository } from "@modules/tenders/repositories/tender.repository";
import { AiAnalysisRepository } from "@modules/ai-analysis/repositories/ai-analysis.repository";

@Injectable()
export class DashboardService {
    constructor(
        private readonly tenderRepository: TenderRepository,
        private readonly aiAnalysisRepository: AiAnalysisRepository
    ) {}

    async getDashboard(userId: string) {
        const [
            totalTenders,
            analyzedTenders,
            statusSummary,
            averageScore,
            recentTenders,
            recommendations,
        ] = await Promise.all([
            this.tenderRepository.countAll(),
            this.aiAnalysisRepository.countAll(),
            this.tenderRepository.countByStatus(),
            this.aiAnalysisRepository.averageScore(),
            this.tenderRepository.recentFind(5),
            this.aiAnalysisRepository.findRecommendations(),
        ]);

        const dashboard = {
            overview: {
                totalTenders,
                analyzedTenders,
                averageScore: Math.round(
                    averageScore._avg.score ?? 0,
                ),
            },
            statusSummary: statusSummary.map(item => ({
                status: item.status,
                count: item._count.status,
            })),
            recommendationSummary: recommendations.map(item => ({
                decision: item.recommendationDecision,
                count: item._count.recommendationDecision,
            })),
            recentTenders: recentTenders.map(tender => ({
                id: tender.id,
                title: tender.title,
                status: tender.status,
                score: tender.analyses[0]?.score ?? null,
                recommendation:
                    (tender.analyses[0]?.recommendation as any)
                        ?.decision ?? null,
                analyzedAt:
                    tender.analyses[0]?.analyzedAt ?? null,
                createdAt: tender.createdAt,
            })),
        };

        return dashboard;
    }
}