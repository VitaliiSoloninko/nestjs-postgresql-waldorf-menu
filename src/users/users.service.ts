import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PasswordReset } from 'src/auth/password-resets.model';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

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
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await user.save();
  }

  async removeUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await user.destroy();
    return { message: `User with id ${id} has been deleted` };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  // ****** Password Reset Methods

  async setResetToken(userId: number, token: string, expires: Date) {
    await PasswordReset.destroy({ where: { userId } });
    await PasswordReset.create({ userId, token, expires });
  }

  async getUserByResetToken(token: string) {
    const record = await PasswordReset.findOne({
      where: {
        token,
        expires: { [Op.gt]: new Date() },
      },
      include: [{ model: User }],
    });
    return record && record.user ? record.user : null;
  }

  async updatePassword(userId: number, newPassword: string) {
    const hash = await bcrypt.hash(newPassword, 5);
    await this.userRepository.update(
      { password: hash },
      { where: { id: userId } },
    );
  }

  async clearResetToken(userId: number) {
    await PasswordReset.destroy({ where: { userId } });
  }
}
