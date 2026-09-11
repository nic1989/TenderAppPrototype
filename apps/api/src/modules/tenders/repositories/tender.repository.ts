import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app-prisma/prisma.service";
import { Prisma, Tender } from "@prisma/client";

@Injectable()
export class TenderRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: Prisma.TenderUncheckedCreateInput): Promise<Tender> {
        return this.prisma.tender.create({
            data,
        });
    }

    update(id: string, data: {
        title?: string;
        description?: string;
        status?: string;
    }): Promise<Tender> {
        return this.prisma.tender.update({
            where: {id},
            data
        });
    }

    findAll(): Promise<Tender[]> {
        return this.prisma.tender.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                documents: true,
            },
        });
    }

    findById(id: string): Promise<Tender | null> {
        return this.prisma.tender.findUnique({
            where: { id },
            include: {
                documents: true,
                analyses: true
            },
        });
    }

    deleteById(id: string): Promise<Tender | null> {
        return this.prisma.tender.delete({
            where: {id}
        })
    }

    updateStatus(id: string, status: string) {
        return this.prisma.tender.update({
            where: { id },
            data: { status }
        });
    }

    countAll() {
        return this.prisma.tender.count();
    }
    
    countByStatus() {
        return this.prisma.tender.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
        });
    }

    recentFind(limit: number) {
        return this.prisma.tender.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
            include: {
                analyses: {
                    select: {
                        score: true,
                        recommendation: true,
                        analyzedAt: true,
                    },
                },
            },
        });
    }

    findByIds(ids: string[]) {
        return this.prisma.tender.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            include: {
                analyses: true,
            },
        });
    }
}