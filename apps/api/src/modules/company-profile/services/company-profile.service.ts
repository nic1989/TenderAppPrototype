import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CompanyProfileRepository } from "../repositories/company-profile.repository";
import { UserRepository } from "@modules/users/repositories/user.repository";
import { CreateCompanyProfileDto } from "../dto/create-company-profile.dto";
import { UpdateCompanyProfileDto } from "../dto/update-company-profile.dto";

@Injectable()
export class CompanyProfileService {
    constructor(
        private readonly companyProfileRepository: CompanyProfileRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async findOrganizationCompany(userId: string) {
        const companyProfile = await this.companyProfileRepository.findByUserId(userId);
        if (!companyProfile) {
            throw new NotFoundException(
                'Company profile not found.',
            );
        }

        return companyProfile;
    }

    async create(dto: CreateCompanyProfileDto, userId: string) {
        try {    
            const user = await this.userRepository.findById(userId);
            
            if (!user?.organizationId) {
                throw new BadRequestException(
                    'User is not associated with an organization.',
                );
            }

            return this.companyProfileRepository.create({
                companyName: dto.companyName,
                turnover: dto?.turnover,
                experience: dto?.experience,
                certifications: dto?.certifications,
                documents: dto?.documents,
                employeeCount: dto?.employeeCount,
                gstNumber: dto?.gstNumber,
                industry: dto?.industry,
                website: dto?.website,
                organizationId: user.organizationId!
            });
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }

    update(id: string, data: UpdateCompanyProfileDto) {
        try {
            return this.companyProfileRepository.update(id, data)
        } catch (err) {
            throw new BadRequestException(
                err?.meta?.cause ?? err?.message ?? 'Unknown Error',
            );
        }
    }
}