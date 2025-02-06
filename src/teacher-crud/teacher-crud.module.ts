import { Module } from '@nestjs/common';
import { TeacherCrudService } from './teacher-crud.service';
import { TeacherCrudController } from './teacher-crud.controller';
import { Teacher, TeacherSchema } from 'src/schemas/teacher.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
  controllers: [TeacherCrudController],
  providers: [TeacherCrudService],
})
export class TeacherCrudModule {}
