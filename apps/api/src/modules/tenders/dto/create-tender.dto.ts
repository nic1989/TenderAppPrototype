import { IsNotEmpty, IsString, IsOptional  } from "class-validator"

export class CreateTenderDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}