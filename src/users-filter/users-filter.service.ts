import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class UsersFilterService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUsersPaginated(
    page = 1,
    limit = 10,
  ): Promise<{ count: number; rows: User[] }> {
    const offset = (page - 1) * limit;
    return this.userRepository.findAndCountAll({
      offset,
      limit,
      order: [['id', 'ASC']],
    });
  }

  // async filterUsers(filters: { id?: number; firstName?: string }) {
  //   const where: any = {};
  //   if (filters.id !== undefined) {
  //     where.id = filters.id;
  //   }
  //   if (filters.firstName) {
  //     where.firstName = { [Op.iLike]: `%${filters.firstName}%` };
  //   }
  //   return this.userRepository.findAll({ where });
  // }

  async filterUsers(filters: {
    id?: number;
    firstName?: string;
    lastName?: string;
    firstNameChild?: string;
    lastNameChild?: string;
    email?: string;
  }) {
    const where: any = {};

    if (filters.id !== undefined && !isNaN(filters.id)) {
      where.id = filters.id;
    }
    if (filters.firstName) {
      where.firstName = { [Op.iLike]: `%${filters.firstName}%` };
    }
    if (filters.lastName) {
      where.lastName = { [Op.iLike]: `%${filters.lastName}%` };
    }
    if (filters.firstNameChild) {
      where.firstNameChild = { [Op.iLike]: `%${filters.firstNameChild}%` };
    }
    if (filters.lastNameChild) {
      where.lastNameChild = { [Op.iLike]: `%${filters.lastNameChild}%` };
    }
    if (filters.email) {
      where.email = { [Op.iLike]: `%${filters.email}%` };
    }

    return this.userRepository.findAll({ where });
  }
}
