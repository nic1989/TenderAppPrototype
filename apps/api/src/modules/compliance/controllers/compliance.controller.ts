import { Controller, UseGuards, Post, Param } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { ComplianceService } from "../services/compliance.service";
import { CurrentUser } from '@common/decorators/current-user.decorator';
import type { JwtUser } from "@modules/auth/interfaces/jwt-user.interface";

@Controller('/tenders/:id')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
    constructor (
        private readonly complianceService: ComplianceService
    ) {}

    /**
     * Tender Compliance
     * POST /tenders/:id/compliance
     */
    @Post('/compliance')
    verifyCompliance(@Param('id') tenderId: string, @CurrentUser() user: JwtUser) {
        return this.complianceService.verify(tenderId, user.id);
    }

    /**
     * Tender Compliance
     * POST /tenders/:id/checklist
     */
    @Post('/checklist')
    generate(@Param('id') tenderId: string) {
        return this.complianceService.checklist(tenderId);
    }
}