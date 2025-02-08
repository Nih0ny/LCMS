import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeCrudDto } from './dto/create-grade-crud.dto';
import { UpdateGradeCrudDto } from './dto/update-grade-crud.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Grade } from '../schemas/grade.schema';

@Injectable()
export class GradeCrudService {
  constructor(
    @InjectModel(Grade.name) private readonly gradeModel: Model<Grade>,
  ) {}

  async create(createGradeCrudDto: CreateGradeCrudDto): Promise<Grade> {
    const createdGrade = new this.gradeModel(createGradeCrudDto);
    return await createdGrade.save();
  }

  async findAll(): Promise<Grade[]> {
    return await this.gradeModel
      .find()
      .populate('user')
      .populate('course')
      .exec();
  }

  async findOne(id: string): Promise<Grade> {
    const grade = await this.gradeModel
      .findById(id)
      .populate('user')
      .populate('course')
      .exec();
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${id} not found.`);
    }
    return grade;
  }

  async update(
    id: string,
    updateGradeCrudDto: UpdateGradeCrudDto,
  ): Promise<Grade> {
    const updatedGrade = await this.gradeModel
      .findByIdAndUpdate(id, updateGradeCrudDto, { new: true })
      .exec();

    if (!updatedGrade) {
      throw new NotFoundException(`Grade with ID ${id} not found.`);
    }

    return updatedGrade;
  }

  async remove(id: string): Promise<Grade> {
    const deletedGrade = await this.gradeModel.findByIdAndDelete(id).exec();
    if (!deletedGrade) {
      throw new NotFoundException(`Grade with ID ${id} not found.`);
    }
    return deletedGrade;
  }
}
