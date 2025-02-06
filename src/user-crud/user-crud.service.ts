import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserCrudDto } from './dto/create-user-crud.dto';
import { UpdateUserCrudDto } from './dto/update-user-crud.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserCrudService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserCrudDto: CreateUserCrudDto): Promise<User> {
    const { name, email } = createUserCrudDto;

    if (!name || !email) {
      throw new BadRequestException('Name and email are required');
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = new this.userModel(createUserCrudDto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().populate('courses');
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('courses');
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserCrudDto: UpdateUserCrudDto,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserCrudDto, {
        new: true,
        runValidators: true,
      })
      .populate('courses');

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
