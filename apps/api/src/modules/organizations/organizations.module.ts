import { Module } from '@nestjs/common';
import { PrismaModule } from '@app-prisma/prisma.module';

import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationRepository } from './repositories/organization.repository';
import { OrganizationService } from './services/organization.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationsController],
  providers: [
    OrganizationRepository,
    OrganizationService,
  ],
  exports: [OrganizationService],
})
export class OrganizationsModule {}