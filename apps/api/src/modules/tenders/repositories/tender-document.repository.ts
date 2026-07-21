import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app-prisma/prisma.service";
import { Prisma, TenderDocument } from "@prisma/client";

@Injectable()
export class TenderDocumentRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: Prisma.TenderDocumentUncheckedCreateInput) {
        return this.prisma.tenderDocument.create({
            data,
        });
    }

    findByTenderId(tenderId: string) {
        return this.prisma.tenderDocument.findMany({
            where: { tenderId },
            orderBy: {
                createdAt: 'desc',
            }
        });
    }

    delete(id: string) {
        return this.prisma.tenderDocument.delete({
            where: { id }
        });
    }
}