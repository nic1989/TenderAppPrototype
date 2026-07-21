import { Controller, UseGuards, Get } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import type { JwtUser } from "@modules/auth/interfaces/jwt-user.interface";
import { DashboardService } from "../services/dashboard.service";

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {

    constructor(
        private readonly dashboardService: DashboardService,
    ) {}

    @Get()
    getDashboard(@CurrentUser() user: JwtUser,) {
        return this.dashboardService.getDashboard(user.id);
    }
}