import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherCrudDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, description: 'Teacher name' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, description: 'Teacher surname' })
  readonly surname: string;
}
