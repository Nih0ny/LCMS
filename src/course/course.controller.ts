import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from '../schemas/course.schema';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({
    description: 'Data required to create a course',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Introduction to Programming' },
        teacher: { type: 'string', example: 'John Doe' },
        duration: { type: 'number', example: 12 },
        startDate: { type: 'string', format: 'date', example: '2025-03-01' },
      },
      required: ['name', 'teacher', 'duration', 'startDate'],
    },
  })
  async createCourse(@Body() courseData: Partial<Course>) {
    return this.courseService.createCourse(courseData);
  }

  @Get()
  @ApiOperation({ summary: 'Search courses by teacher or name' })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Search by teacher or course name',
  })
  async searchCourses(@Query('q') query: string) {
    return await this.courseService.findCoursesByTeacherOrName(query);
  }

  @Post(':courseId/register/:userId')
  @ApiOperation({ summary: 'Register a user to a course' })
  @ApiParam({ name: 'courseId', description: 'ID of the course' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  async registerStudent(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    return await this.courseService.registerUser(courseId, userId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get courses for a specific user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  async getCoursesForUser(@Param('userId') userId: string) {
    return await this.courseService.getCoursesForUser(userId);
  }
}
