import { Injectable } from '@nestjs/common';
import { CreateCourseCrudDto } from './dto/create-course-crud.dto';
import { UpdateCourseCrudDto } from './dto/update-course-crud.dto';

@Injectable()
export class CourseCrudService {
  create(createCourseCrudDto: CreateCourseCrudDto) {
    return 'This action adds a new courseCrud';
  }

  findAll() {
    return `This action returns all courseCrud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseCrud`;
  }

  update(id: number, updateCourseCrudDto: UpdateCourseCrudDto) {
    return `This action updates a #${id} courseCrud`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseCrud`;
  }
}
