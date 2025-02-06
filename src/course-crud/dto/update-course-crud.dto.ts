import { PartialType } from '@nestjs/swagger';
import { CreateCourseCrudDto } from './create-course-crud.dto';

export class UpdateCourseCrudDto extends PartialType(CreateCourseCrudDto) {}
