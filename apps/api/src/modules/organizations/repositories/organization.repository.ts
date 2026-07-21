import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app-prisma/prisma.service';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
        name: string;
        industry?: string;
        gstNumber?: string;
        turnover?: number;
    }): Promise<Organization> {
    return this.prisma.organization.create({
        data
    });
  }

  update(id: string, data: {
    name?: string;
    industry?: string;
    gstNumber?: string;
    turnover?: number;
  }): Promise<Organization> {
    return this.prisma.organization.update({
        where: {id},
        data
    });
  }

  findAll(): Promise<Organization[]> {
    return this.prisma.organization.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: {
        id
      }
    });
  }

  deleteById(id: string): Promise<Organization | null> {
    return this.prisma.organization.delete({
        where: {id}
    })
  }
}