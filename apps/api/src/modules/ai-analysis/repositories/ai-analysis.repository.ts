import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app-prisma/prisma.service';
import { Prisma, TenderAnalysis } from '@prisma/client';

@Injectable()
export class AiAnalysisRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.TenderAnalysisUncheckedCreateInput): Promise<TenderAnalysis> {
    return this.prisma.tenderAnalysis.create({
      data
    });
  }

  findByTenderId(tenderId: string): Promise<TenderAnalysis | null> {
    return this.prisma.tenderAnalysis.findUnique({
      where: { tenderId }
    });
  }

  update(tenderId: string, data: Prisma.TenderAnalysisUpdateInput): Promise<TenderAnalysis> {
    return this.prisma.tenderAnalysis.update({
      where: { tenderId },
      data
    });
  }

  deleteByTenderId(tenderId: string): Promise<TenderAnalysis> {
    return this.prisma.tenderAnalysis.delete({
      where: { tenderId }
    });
  }

  countAll() {
      return this.prisma.tenderAnalysis.count();
  }
    
  averageScore() {
    return this.prisma.tenderAnalysis.aggregate({
        _avg: {
            score: true,
        },
    });
  }

  findRecommendations() {
    return this.prisma.tenderAnalysis.groupBy({
        by: ['recommendationDecision'],
        _count: {
            recommendationDecision: true,
        }
    });
  }
}