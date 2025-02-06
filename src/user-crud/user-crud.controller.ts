import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserCrudService } from './user-crud.service';
import { CreateUserCrudDto } from './dto/create-user-crud.dto';
import { UpdateUserCrudDto } from './dto/update-user-crud.dto';

@ApiTags('User CRUD')
@Controller('user-crud')
export class UserCrudController {
  constructor(private readonly userCrudService: UserCrudService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserCrudDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserCrudDto: CreateUserCrudDto) {
    return await this.userCrudService.create(createUserCrudDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
  })
  async findAll() {
    return await this.userCrudService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return await this.userCrudService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: UpdateUserCrudDto, required: true })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserCrudDto: UpdateUserCrudDto,
  ) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return await this.userCrudService.update(id, updateUserCrudDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return await this.userCrudService.remove(id);
  }
}
