import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TeacherCrudService } from './teacher-crud.service';
import { CreateTeacherCrudDto } from './dto/create-teacher-crud.dto';
import { UpdateTeacherCrudDto } from './dto/update-teacher-crud.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Teacher } from '../schemas/teacher.schema';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherCrudController {
  constructor(private readonly teacherCrudService: TeacherCrudService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiBody({ type: CreateTeacherCrudDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Teacher created successfully',
    type: Teacher,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTeacherCrudDto: CreateTeacherCrudDto,
  ): Promise<Teacher> {
    return await this.teacherCrudService.create(createTeacherCrudDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all teachers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of teachers retrieved successfully',
    type: [Teacher],
  })
  async findAll(): Promise<Teacher[]> {
    return await this.teacherCrudService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a teacher by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Teacher ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Teacher retrieved successfully',
    type: Teacher,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Teacher not found',
  })
  async findOne(@Param('id') id: string): Promise<Teacher> {
    return await this.teacherCrudService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a teacher by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Teacher ID' })
  @ApiBody({ type: UpdateTeacherCrudDto, required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Teacher updated successfully',
    type: Teacher,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Teacher not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTeacherCrudDto: UpdateTeacherCrudDto,
  ): Promise<Teacher> {
    return await this.teacherCrudService.update(id, updateTeacherCrudDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Teacher ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Teacher deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Teacher not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.teacherCrudService.remove(id);
  }
}
