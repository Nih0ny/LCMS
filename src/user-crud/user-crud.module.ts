import { Module } from '@nestjs/common';
import { UserCrudService } from './user-crud.service';
import { UserCrudController } from './user-crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Course, CourseSchema } from 'src/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [UserCrudController],
  providers: [UserCrudService],
})
export class UserCrudModule {}
