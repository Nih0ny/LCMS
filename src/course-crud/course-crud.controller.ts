import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseCrudDto } from './dto/create-course-crud.dto';
import { UpdateCourseCrudDto } from './dto/update-course-crud.dto';
import { Course, CourseDocument } from '../schemas/course.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('course-crud')
export class CourseCrudController {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course successfully created.' })
  async create(
    @Body() createCourseCrudDto: CreateCourseCrudDto,
  ): Promise<Course> {
    const newCourse = new this.courseModel(createCourseCrudDto);
    return newCourse.save();
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'List of courses.' })
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().populate('teacher').exec();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single course by ID' })
  @ApiResponse({ status: 200, description: 'Course details.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async findOne(@Param('id') id: string): Promise<Course> {
    const course = await this.courseModel
      .findById(id)
      .populate('teacher')
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiResponse({ status: 200, description: 'Course successfully updated.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseCrudDto: UpdateCourseCrudDto,
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  @ApiResponse({ status: 200, description: 'Course successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }
}
