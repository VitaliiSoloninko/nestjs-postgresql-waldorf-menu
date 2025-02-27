import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async removeRole(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new Error('Role not found');
    }
    await role.destroy();
  }
}
