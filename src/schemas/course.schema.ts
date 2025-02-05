import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Teacher } from './teacher.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  course: Teacher;

  @Prop()
  duration: number;

  @Prop()
  started_at: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
