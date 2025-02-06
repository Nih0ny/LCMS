import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from '../../schemas/course.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCrudDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'User name' })
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, description: 'User email' })
  readonly email?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false, description: 'User courses' })
  @Type(() => String)
  readonly courses?: Course[];
}
