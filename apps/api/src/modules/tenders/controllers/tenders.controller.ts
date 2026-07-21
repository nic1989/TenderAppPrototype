import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateTenderDto } from '../dto/create-tender.dto';
import { UpdateTenderDto } from '../dto/update-tender.dto';
import { TenderService } from '../services/tender.service';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import type { JwtUser } from '../../auth/interfaces/jwt-user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { multerConfig } from '@modules/uploads/multer.config';

@Controller('tenders')
@UseGuards(JwtAuthGuard)
export class TendersController {
    constructor(
        private readonly tenderService: TenderService,
    ) { }

    @Post()
    create(@Body() dto: CreateTenderDto, @CurrentUser() user: JwtUser) {
        return this.tenderService.create(dto, user?.id);
    }

    @Patch()
    update(@Body() dto: UpdateTenderDto, @Param('id') id: string) {
        return this.tenderService.update(dto, id);
    }

    @Get()
    findAll() {
        return this.tenderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tenderService.findById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tenderService.deleteById(id);
    }

    @Post(':id/documents')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    uploadDocument(@Param('id') tenderId: string, @UploadedFile() file: Express.Multer.File, @CurrentUser() user: JwtUser) {
        return this.tenderService.uploadDocument(
            tenderId,
            file,
            user.id,
        );
    }

    @Get(':id/documents')
    documents(@Param('id') tenderId: string) {
        return this.tenderService.getDocumentsById(tenderId)
    }

    @Delete(':id/documents')
    deleteDocument(@Param('id') id: string) {
        return this.tenderService.deleteDocument(id)
    }
}