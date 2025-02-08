import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateGradeCrudDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'User ID' })
  user?: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Course ID' })
  course?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Grade' })
  grade?: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Created date' })
  created_at?: string;
}
