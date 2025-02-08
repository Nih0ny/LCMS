import { Module } from '@nestjs/common';
import { GradeCrudService } from './grade-crud.service';
import { GradeCrudController } from './grade-crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Course, CourseSchema } from 'src/schemas/course.schema';
import { Grade, GradeSchema } from 'src/schemas/grade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Grade.name, schema: GradeSchema },
    ]),
  ],
  controllers: [GradeCrudController],
  providers: [GradeCrudService],
})
export class GradeCrudModule {}
