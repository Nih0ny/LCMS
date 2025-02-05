import { Controller, Post, Param, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { GradeDto } from 'src/dtos/grade.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({
    description: 'Data required to create a user',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        courses: {
          type: 'array',
          items: { type: 'string' },
          example: ['courseId1', 'courseId2'],
        },
      },
      required: ['name', 'email'],
    },
  })
  async createUser(@Body() userData: Partial<User>) {
    return await this.userService.createUser(userData);
  }

  @Post(':userId/grade/:courseId')
  @ApiOperation({ summary: 'Grade a user for a course' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiParam({ name: 'courseId', description: 'ID of the course' })
  @ApiResponse({ status: 200, description: 'User graded successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid grade value.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        grade: {
          type: 'number',
          example: 85,
          description:
            'The grade value for the user, should be between 0 and 100',
        },
      },
      required: ['grade'],
    },
  })
  async gradeUser(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Body(new ValidationPipe()) gradeValue: GradeDto,
  ) {
    return await this.userService.gradeUser(courseId, userId, gradeValue);
  }
}
