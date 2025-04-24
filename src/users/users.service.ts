import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByValue('USER');
    await user.$set('roles', [role!.id]);
    user.roles = [role!];
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);
    return await user.save();
  }

  async removeUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await user.destroy();
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async filterUsers(filters: {
    firstName?: string;
    lastName?: string;
  }): Promise<User[]> {
    const where: any = {};

    // Add `firstName` to the query if provided
    if (filters.firstName) {
      where.firstName = { [Op.iLike]: `%${filters.firstName}%` }; // Case-insensitive search
    }

    // Add `lastName` to the query if provided
    if (filters.lastName) {
      where.lastName = { [Op.iLike]: `%${filters.lastName}%` };
    }

    console.log('Generated WHERE conditions:', where); // Debugging log

    return this.userRepository.findAll({ where });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user; // Return `true` if the user exists, otherwise `false`
  }
}
