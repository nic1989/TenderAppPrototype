import { ArrayMaxSize, ArrayMinSize, IsArray, IsUUID  } from 'class-validator';

export class CompareTendersDto {
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(5)
    @IsUUID('4', { each: true })
    tenderIds: string[];
}