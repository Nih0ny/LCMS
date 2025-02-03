import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { UserSchema } from './schemas/user.schema';
import { GradeSchema } from './schemas/grade.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://nazar:nazar@lr9.4svqc3w.mongodb.net/',
    ),
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Grade', schema: GradeSchema },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
