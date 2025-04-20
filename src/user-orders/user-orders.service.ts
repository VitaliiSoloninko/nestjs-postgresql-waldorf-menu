import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/orders/orders.model';

@Injectable()
export class UserOrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll({ where: { userId } });
  }

  async findOrdersByUserIdAndCurrentYear(userId: number): Promise<Order[]> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return this.orderRepository.findAll({
      where: {
        userId,
        year: currentYear,
      },
    });
  }

  async findOrdersByUserIdAndWeekAndYear(
    userId: number,
    weekNumber: number,
  ): Promise<Order[]> {
    const currentYear = new Date().getFullYear();

    return this.orderRepository.findAll({
      where: {
        userId,
        week: weekNumber,
        year: currentYear,
      },
    });
  }

  async findOrdersByUserIdAndMonthAndYear(
    userId: number,
    monthNumber: number,
    yearNumber: number,
  ): Promise<Order[]> {
    const currentYear = new Date().getFullYear();
    const currentMonth = monthNumber;
    const year = yearNumber;

    return this.orderRepository.findAll({
      where: {
        userId,
        month: currentMonth,
        year: currentYear,
      },
    });
  }
}
