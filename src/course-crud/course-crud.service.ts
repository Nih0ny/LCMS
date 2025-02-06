import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseCrudDto } from './dto/create-course-crud.dto';
import { UpdateCourseCrudDto } from './dto/update-course-crud.dto';
import { Course, CourseDocument } from '../schemas/course.schema';

@Injectable()
export class CourseCrudService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  // Create a new course
  async create(createCourseCrudDto: CreateCourseCrudDto): Promise<Course> {
    const newCourse = new this.courseModel(createCourseCrudDto);
    return newCourse.save();
  }

  // Get all courses
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().populate('teacher').exec();
  }

  // Get a single course by ID
  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel
      .findById(id)
      .populate('teacher')
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  // Update a course by ID
  async update(
    id: string,
    updateCourseCrudDto: UpdateCourseCrudDto,
  ): Promise<Course> {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseCrudDto, { new: true })
      .populate('teacher')
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  // Delete a course by ID
  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }
}
