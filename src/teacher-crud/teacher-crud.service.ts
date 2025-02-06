import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherCrudDto } from './dto/create-teacher-crud.dto';
import { UpdateTeacherCrudDto } from './dto/update-teacher-crud.dto';
import { Teacher, TeacherDocument } from '../schemas/teacher.schema';

@Injectable()
export class TeacherCrudService {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  async create(createTeacherCrudDto: CreateTeacherCrudDto): Promise<Teacher> {
    const { name, surname } = createTeacherCrudDto;

    if (!name || !surname) {
      throw new BadRequestException('Name and surname are required');
    }

    const newTeacher = new this.teacherModel(createTeacherCrudDto);
    return await newTeacher.save();
  }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherModel.find().exec();
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(
    id: string,
    updateTeacherCrudDto: UpdateTeacherCrudDto,
  ): Promise<Teacher> {
    const updatedTeacher = await this.teacherModel
      .findByIdAndUpdate(id, updateTeacherCrudDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return updatedTeacher;
  }

  async remove(id: string): Promise<void> {
    const result = await this.teacherModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
  }
}
