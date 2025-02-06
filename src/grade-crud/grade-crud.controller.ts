import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradeCrudService } from './grade-crud.service';
import { CreateGradeCrudDto } from './dto/create-grade-crud.dto';
import { UpdateGradeCrudDto } from './dto/update-grade-crud.dto';

@Controller('grade-crud')
export class GradeCrudController {
  constructor(private readonly gradeCrudService: GradeCrudService) {}

  @Post()
  create(@Body() createGradeCrudDto: CreateGradeCrudDto) {
    return this.gradeCrudService.create(createGradeCrudDto);
  }

  @Get()
  findAll() {
    return this.gradeCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeCrudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeCrudDto: UpdateGradeCrudDto) {
    return this.gradeCrudService.update(+id, updateGradeCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeCrudService.remove(+id);
  }
}
