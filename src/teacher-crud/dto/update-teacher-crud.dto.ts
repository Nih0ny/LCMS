import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeacherCrudDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'Teacher name' })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'Teacher surname' })
  readonly surname?: string;
}
