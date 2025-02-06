import { PartialType } from '@nestjs/swagger';
import { CreateGradeCrudDto } from './create-grade-crud.dto';

export class UpdateGradeCrudDto extends PartialType(CreateGradeCrudDto) {}
