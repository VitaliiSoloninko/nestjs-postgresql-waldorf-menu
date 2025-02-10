import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: CreateRoleDto })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [CreateRoleDto] })
  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Get one role' })
  @ApiResponse({ status: 200, type: CreateRoleDto })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 200 })
  @Delete('/:value')
  remove(@Param('value') value: string) {
    return this.rolesService.removeRole(value);
  }
}
