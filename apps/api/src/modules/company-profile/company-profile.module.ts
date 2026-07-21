import { Module } from "@nestjs/common";
import { PrismaModule } from "@app-prisma/prisma.module";
import { CompanyProfileController } from "./controllers/company-profile.controller";
import { CompanyProfileService } from "./services/company-profile.service";
import { CompanyProfileRepository } from "./repositories/company-profile.repository";
import { UserRepository } from "@modules/users/repositories/user.repository";

@Module({
    imports: [PrismaModule],
    controllers: [CompanyProfileController],
    providers: [
        CompanyProfileService,
        CompanyProfileRepository,
        UserRepository
    ]
})

export class CompanyProfileModule {}