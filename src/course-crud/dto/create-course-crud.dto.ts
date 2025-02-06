import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsMongoId,
} from 'class-validator';

export class CreateCourseCrudDto {
  @ApiProperty({ description: 'Name of the course' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID of the assigned teacher' })
  @IsNotEmpty()
  @IsMongoId()
  teacher: string;

  @ApiProperty({ description: 'Duration of the course in hours' })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'Start date of the course' })
  @IsNotEmpty()
  @IsDate()
  started_at: Date;
}
