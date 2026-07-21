import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { TenderComparisonService } from '../services/tender-comparison.service';
import { CompareTendersDto } from '../dto/compare-tenders.dto';

@Controller('tenders')
@UseGuards(JwtAuthGuard)
export class TenderComparisonController {
  constructor(
    private readonly tenderComparisonService: TenderComparisonService,
  ) {}

  /**
   * Compare Multiple Tenders
   *
   * POST /tenders/compare
   */
  @Post('compare')
  compare(@Body() body: CompareTendersDto) {
    return this.tenderComparisonService.compare(body.tenderIds)
  }
}