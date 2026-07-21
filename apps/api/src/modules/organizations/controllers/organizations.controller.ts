import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { OrganizationService } from '../services/organization.service';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(
    private readonly organizationService: OrganizationService,
  ) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto) {
    return this.organizationService.create(dto);
  }

  @Patch(':id')
  update(@Body() dto: UpdateOrganizationDto, @Param('id') id: string) {
    return this.organizationService.udpate(dto, id);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.organizationService.deleteById(id);
  }
}