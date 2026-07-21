import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TendersModule } from '@modules/tenders/tenders.module';
import { OrganizationsModule } from '@modules/organizations/organizations.module';
import { UploadsModule } from '@modules/uploads/uploads.module';
import { AiAnalysisModule } from '@modules/ai-analysis/ai-analysis.module';
import { AiChatModule } from '@modules/ai-chat/ai-chat.module';
import { ComplianceModule } from '@modules/compliance/compliance.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { TenderComparisonModule } from '@modules/tender-comparison/tender-comparison.module';
import { CompanyProfileModule } from '@modules/company-profile/company-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    OrganizationsModule,
    TendersModule,
    UploadsModule,
    AiAnalysisModule,
    AiChatModule,
    ComplianceModule,
    DashboardModule,
    TenderComparisonModule,
    CompanyProfileModule
  ],
})
export class AppModule {}