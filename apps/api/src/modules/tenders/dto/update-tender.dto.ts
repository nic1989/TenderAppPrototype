import { IsNotEmpty, IsString, IsOptional, IsDateString  } from "class-validator"

export class UpdateTenderDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}