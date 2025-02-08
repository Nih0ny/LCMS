import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GradeCrudService } from './grade-crud.service';
import { CreateGradeCrudDto } from './dto/create-grade-crud.dto';
import { UpdateGradeCrudDto } from './dto/update-grade-crud.dto';

@ApiTags('Grade CRUD')
@Controller('grade-crud')
export class GradeCrudController {
  constructor(private readonly gradeCrudService: GradeCrudService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new grade',
    description:
      'Creates a new grade for a user and a course with a grade and timestamp.',
  })
  @ApiResponse({
    status: 201,
    description: 'The grade has been successfully created.',
    type: CreateGradeCrudDto,
  })
  @ApiResponse({ status: 400, description: 'Failed to create grade.' })
  async create(@Body() createGradeCrudDto: CreateGradeCrudDto) {
    try {
      return await this.gradeCrudService.create(createGradeCrudDto);
    } catch (error) {
      throw new HttpException('Failed to create grade', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all grades' })
  @ApiResponse({ status: 200, description: 'Successfully fetched all grades.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch grades.' })
  async findAll() {
    try {
      return await this.gradeCrudService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch grades',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a grade by ID',
    description: 'Fetch a specific grade by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Successfully fetched the grade.' })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.gradeCrudService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a grade by ID',
    description:
      'Update the grade, user, or course associated with the grade using its ID.',
  })
  @ApiResponse({ status: 200, description: 'Successfully updated the grade.' })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateGradeCrudDto: UpdateGradeCrudDto,
  ) {
    try {
      return await this.gradeCrudService.update(id, updateGradeCrudDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a grade by ID',
    description: 'Delete a grade record using its unique ID.',
  })
  @ApiResponse({ status: 200, description: 'Successfully deleted the grade.' })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.gradeCrudService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
