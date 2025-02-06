import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseCrudService } from './course-crud.service';
import { CreateCourseCrudDto } from './dto/create-course-crud.dto';
import { UpdateCourseCrudDto } from './dto/update-course-crud.dto';

@Controller('course-crud')
export class CourseCrudController {
  constructor(private readonly courseCrudService: CourseCrudService) {}

  @Post()
  create(@Body() createCourseCrudDto: CreateCourseCrudDto) {
    return this.courseCrudService.create(createCourseCrudDto);
  }

  @Get()
  findAll() {
    return this.courseCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseCrudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseCrudDto: UpdateCourseCrudDto) {
    return this.courseCrudService.update(+id, updateCourseCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseCrudService.remove(+id);
  }
}
