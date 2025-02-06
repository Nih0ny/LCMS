import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsMongoId,
} from 'class-validator';

export class UpdateCourseCrudDto {
  @ApiProperty({ description: 'Name of the course' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID of the assigned teacher' })
  @IsOptional()
  @IsMongoId()
  teacher: string;

  @ApiProperty({ description: 'Duration of the course in hours' })
  @IsOptional()
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'Start date of the course' })
  @IsOptional()
  @IsDate()
  started_at: Date;
}
