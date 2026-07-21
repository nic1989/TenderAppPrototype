import { Controller, Get, Post, Body, Patch, UseGuards, Param } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { CompanyProfileService } from "../services/company-profile.service";
import { CurrentUser } from '@common/decorators/current-user.decorator';
import type { JwtUser } from "@modules/auth/interfaces/jwt-user.interface";
import { CreateCompanyProfileDto } from "../dto/create-company-profile.dto";
import { UpdateCompanyProfileDto } from "../dto/update-company-profile.dto";

@Controller('company-profile')
@UseGuards(JwtAuthGuard)
export class CompanyProfileController {
    constructor (
        private readonly companyProfileService: CompanyProfileService
    ) {}

    @Get()
    profile(@CurrentUser() user: JwtUser) {
        return this.companyProfileService.findOrganizationCompany(user.id)
    }

    @Post()
    create(@Body() dto: CreateCompanyProfileDto, @CurrentUser() user: JwtUser) {
        return this.companyProfileService.create(dto, user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCompanyProfileDto) {
        return this.companyProfileService.update(id, dto)
    }
}