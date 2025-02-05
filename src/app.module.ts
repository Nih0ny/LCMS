import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { UserSchema } from './schemas/user.schema';
import { GradeSchema } from './schemas/grade.schema';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';

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
  ],
  controllers: [AppController, UserController, CourseController],
  providers: [AppService, UserService, CourseService],
})
export class AppModule {}
