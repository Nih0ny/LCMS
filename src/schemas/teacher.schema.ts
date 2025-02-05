import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {
  @Prop()
  name: string;

  @Prop()
  surname: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
