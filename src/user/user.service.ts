import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GradeDto } from 'src/dtos/grade.dto';
import { Grade } from 'src/schemas/grade.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Grade') private readonly gradeModel: Model<Grade>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).populate('grades');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const { name, email } = userData;

    if (!name || !email) {
      throw new BadRequestException('Name and email are required');
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async gradeUser(
    courseId: string,
    userId: string,
    gradeValue: GradeDto,
  ): Promise<Grade> {
    const grade = new this.gradeModel({
      course: courseId,
      user: userId,
      grade: gradeValue.grade,
      created_at: new Date(),
    });
    return grade.save();
  }
}
