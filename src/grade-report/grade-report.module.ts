import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeReportController } from './grade-report.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { Grade, GradeSchema } from '../schemas/grade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Grade.name, schema: GradeSchema },
    ]),
  ],
  controllers: [GradeReportController],
})
export class GradeReportModule {}
