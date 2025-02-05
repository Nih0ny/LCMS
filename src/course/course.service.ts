import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/schemas/course.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const course = new this.courseModel(courseData);
    return course.save();
  }

  async findCoursesByTeacherOrName(query: string): Promise<Course[]> {
    return this.courseModel
      .find({ $or: [{ name: query }, { teacher: query }] })
      .exec();
  }

  async registerUser(courseId: string, userId: string): Promise<string> {
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { courses: courseId },
    });
    return `User registered to course`;
  }

  async getCoursesForUser(userId: string): Promise<Course[]> {
    const user = await this.userModel.findById(userId).populate('courses');
    return user ? user.courses : [];
  }
}
