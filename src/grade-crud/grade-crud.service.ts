import { Injectable } from '@nestjs/common';
import { CreateGradeCrudDto } from './dto/create-grade-crud.dto';
import { UpdateGradeCrudDto } from './dto/update-grade-crud.dto';

@Injectable()
export class GradeCrudService {
  create(createGradeCrudDto: CreateGradeCrudDto) {
    return 'This action adds a new gradeCrud';
  }

  findAll() {
    return `This action returns all gradeCrud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gradeCrud`;
  }

  update(id: number, updateGradeCrudDto: UpdateGradeCrudDto) {
    return `This action updates a #${id} gradeCrud`;
  }

  remove(id: number) {
    return `This action removes a #${id} gradeCrud`;
  }
}
