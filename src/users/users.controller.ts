import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(+id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

  @ApiOperation({ summary: 'Filter users by firstName and lastName' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('filter')
  filterUsers(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
  ) {
    return this.usersService.filterUsers({ firstName, lastName });
  }

  @ApiOperation({ summary: 'Check if an email exists' })
  @ApiResponse({
    status: 200,
    description: 'Returns true if the email exists, otherwise false',
  })
  @Get('check-email')
  async checkEmailExists(
    @Query('email') email: string,
  ): Promise<{ exists: boolean }> {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    const exists = await this.usersService.checkEmailExists(email);
    return { exists };
  }
}
