import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app-prisma/prisma.service";
import { CompanyProfile, Prisma } from '@prisma/client';

@Injectable()
export class CompanyProfileRepository {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async findByUserId(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                organization: {
                    select: {
                        companyProfile: true
                    },
                }
            }
        });

        return user?.organization?.companyProfile ?? null;
    }

    create(data: Prisma.CompanyProfileUncheckedCreateInput): Promise<CompanyProfile> {
        return this.prisma.companyProfile.create({
            data
        });
    }

    update(id: string, data: Prisma.CompanyProfileUncheckedUpdateInput): Promise<CompanyProfile> {
        return this.prisma.companyProfile.update({
            where: {id},
            data
        });
    }
}