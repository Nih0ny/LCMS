import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Course } from './course.schema';

export type GradeDocument = HydratedDocument<Grade>;

@Schema()
export class Grade {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop()
  grade: string;

  @Prop()
  created_at: string;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
