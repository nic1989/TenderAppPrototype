import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTenderDto } from "../dto/create-tender.dto";
import { UpdateTenderDto } from "../dto/update-tender.dto";
import { TenderRepository } from "../repositories/tender.repository";
import { UserRepository } from "@modules/users/repositories/user.repository";
import { UploadsService } from "@modules/uploads/services/uploads.service";
import { TenderDocumentRepository } from "../repositories/tender-document.repository";
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class TenderService {
    constructor(
        private readonly tenderRepository: TenderRepository,
        private readonly userRepository: UserRepository,
        private readonly uploadsService: UploadsService,
        private readonly tenderDocumentRepository: TenderDocumentRepository
    ) { }

    async create(dto: CreateTenderDto, userId: string) {
        try {
            const user = await this.userRepository.findById(userId);

            if (!user?.organizationId) {
                throw new BadRequestException(
                    'User is not associated with an organization.',
                );
            }

            return this.tenderRepository.create({
                title: dto.title,
                description: dto?.description,
                organizationId: user.organizationId!,
                createdById: user.id
            });
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    update(dto: UpdateTenderDto, id: string) {
        try {
            return this.tenderRepository.update(id, dto);
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    findAll() {
        try {
            return this.tenderRepository.findAll();
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    findById(id: string) {
        try {
            return this.tenderRepository.findById(id);
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    async deleteById(id: string) {
        try {
            await this.tenderRepository.deleteById(id);
            const folder = join(process.cwd(), 'uploads', 'tenders', id);

            if (fs.existsSync(folder)) {
                fs.rmSync(folder, {
                    recursive: true,
                    force: true,
                });
            }
            return {
                message: 'Tender Successfully Deleted'
            }
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    async uploadDocument(tenderId: string, file: Express.Multer.File, userId: string) {
        try {
            const tender = await this.tenderRepository.findById(tenderId);

            if (!tender) {
                throw new BadRequestException('Tender not found');
            }

            const uploaded = this.uploadsService.upload(file);
            await this.tenderDocumentRepository.create({
                tenderId: tender.id,
                orgFileName: file.originalname,
                fileName: uploaded.fileName,
                filePath: uploaded.filePath,
                mimeType: uploaded.mimeType,
                fileSize: uploaded.size,
                uploadedById: userId,
                documentType: 'Tender',
            });

            await this.tenderRepository.updateStatus(tender.id, 'Active');

            return this.tenderRepository.findById(tender.id);
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    async getDocumentsById(tenderId: string) {
        try {
            return await this.tenderDocumentRepository.findByTenderId(tenderId);
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    async deleteDocument(id: string) {
        try {
            return await this.tenderDocumentRepository.delete(id);
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }
}