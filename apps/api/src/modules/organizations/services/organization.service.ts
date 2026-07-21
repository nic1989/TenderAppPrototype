import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { OrganizationRepository } from '../repositories/organization.repository';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  create(dto: CreateOrganizationDto) {
    try {
      return this.organizationRepository.create(dto);
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  udpate(dto: UpdateOrganizationDto, id: string) {
    try {
      return this.organizationRepository.update(id, dto);
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  findAll() {
    try {  
      return this.organizationRepository.findAll();
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  findById(id: string) {
    try {
      return this.organizationRepository.findById(id);
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  async deleteById(id: string) {
    try {
      await this.organizationRepository.deleteById(id);
      return {
          message: 'Delete Successfully'
      }
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }
}