import { Module } from '@nestjs/common';
import { CourseCrudService } from './course-crud.service';
import { CourseCrudController } from './course-crud.controller';
import { Course, CourseSchema } from 'src/schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CourseCrudController],
  providers: [CourseCrudService],
})
export class CourseCrudModule {}
