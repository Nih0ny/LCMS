import { IsString, IsEmail, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from '../../schemas/course.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCrudDto {
  @IsString()
  @ApiProperty({ required: true, description: 'User name' })
  readonly name: string;

  @IsEmail()
  @ApiProperty({ required: true, description: 'User email' })
  readonly email: string;

  @IsArray()
  @ApiProperty({ required: true, description: 'User courses' })
  @Type(() => String)
  readonly courses: Course[];
}
