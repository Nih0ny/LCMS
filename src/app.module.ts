import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { UserSchema } from './schemas/user.schema';
import { GradeSchema } from './schemas/grade.schema';
import { UserCrudModule } from './user-crud/user-crud.module';
import { TeacherCrudModule } from './teacher-crud/teacher-crud.module';
import { GradeCrudModule } from './grade-crud/grade-crud.module';
import { CourseCrudModule } from './course-crud/course-crud.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { GradeReportController } from './grade-report/grade-report.controller';
import { GradeReportModule } from './grade-report/grade-report.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nazar:nazar@lr9.4svqc3w.mongodb.net/kpp?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Grade', schema: GradeSchema },
    ]),
    UserCrudModule,
    TeacherCrudModule,
    GradeCrudModule,
    CourseCrudModule,
    UserModule,
    CourseModule,
    GradeReportModule,
  ],
  controllers: [AppController, GradeReportController],
  providers: [AppService],
})
export class AppModule {}
