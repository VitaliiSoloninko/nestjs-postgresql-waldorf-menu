import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersFilterService } from './users-filter.service';

@Controller('api/users/filter')
export class UsersFilterController {
  constructor(
    private readonly usersFilterService: UsersFilterService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  @ApiOperation({
    summary:
      'Filter users by fields id, firstName, lastName, firstNameChild, lastNameChild, email',
  })
  @ApiResponse({
    status: 200,
    type: [CreateUserDto],
  })
  @Get('find')
  async filterUsers(
    @Query('id') id?: string,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('firstNameChild') firstNameChild?: string,
    @Query('lastNameChild') lastNameChild?: string,
    @Query('email') email?: string,
  ) {
    let numId: number | undefined = undefined;
    if (id !== undefined && id !== '' && !isNaN(Number(id))) {
      numId = Number(id);
    }
    return this.usersFilterService.filterUsers({
      id: numId,
      firstName,
      lastName,
      firstNameChild,
      lastNameChild,
      email,
    });
  }

  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({
    status: 200,
    type: [CreateUserDto],
  })
  @Get('paginated')
  async getUsersPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersFilterService.getUsersPaginated(page, limit);
  }
}
