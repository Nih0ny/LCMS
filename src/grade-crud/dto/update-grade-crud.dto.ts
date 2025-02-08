import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateGradeCrudDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: true, description: 'User ID' })
  user?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: true, description: 'Course ID' })
  course?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, description: 'Grade' })
  grade?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: true, description: 'Created date' })
  created_at?: string;
}
