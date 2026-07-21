import { IsNotEmpty, IsString, IsArray, IsOptional, IsNumber } from "class-validator"

export class CreateCompanyProfileDto {
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    turnover: string;

    @IsNotEmpty()
    @IsString()
    experience: string;

    @IsArray()
    @IsString({ each: true })
    certifications: string[];

    @IsArray()
    @IsString({ each: true })
    documents: string[];

    @IsOptional()
    @IsNumber()
    employeeCount: number;

    @IsOptional()
    @IsString()
    gstNumber: string;

    @IsOptional()
    @IsString()
    industry: string;

    @IsOptional()
    @IsString()
    website: string;
}