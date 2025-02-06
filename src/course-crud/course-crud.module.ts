import { Module } from '@nestjs/common';
import { CourseCrudService } from './course-crud.service';
import { CourseCrudController } from './course-crud.controller';

@Module({
  controllers: [CourseCrudController],
  providers: [CourseCrudService],
})
export class CourseCrudModule {}
