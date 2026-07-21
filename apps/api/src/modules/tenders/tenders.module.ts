import { Module } from '@nestjs/common';
import { PrismaModule } from '@app-prisma/prisma.module';
import { UsersModule } from '@modules/users/users.module';
import { UploadsModule } from '@modules/uploads/uploads.module';

import { TendersController } from './controllers/tenders.controller';
import { TenderService } from './services/tender.service';
import { TenderRepository } from './repositories/tender.repository';
import { TenderDocumentRepository } from './repositories/tender-document.repository';

@Module({
  imports: [PrismaModule, UsersModule, UploadsModule],
  controllers: [TendersController],
  providers: [
    TenderRepository,
    TenderService,
    TenderDocumentRepository
  ],
  exports: [TenderService, TenderRepository, TenderDocumentRepository],
})
export class TendersModule {}