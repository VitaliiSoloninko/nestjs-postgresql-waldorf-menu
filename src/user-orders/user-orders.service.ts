import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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

  async findOrdersByUserIdAndCurrentMonthAndYear(
    userId: number,
  ): Promise<Order[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return this.orderRepository.findAll({
      where: {
        userId,
        year: currentYear,
        month: currentMonth,
      },
    });
  }

  async findOrdersByUserIdAndWeekAndYear(
    userId: number,
    weekNumber: number,
  ): Promise<Order[]> {
    const currentYear = new Date().getFullYear();
    const startOfWeek = this.getStartOfWeek(currentYear, weekNumber);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return this.orderRepository.findAll({
      where: {
        userId,
        date: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
    });
  }

  private getStartOfWeek(year: number, weekNumber: number): Date {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7;
    const startOfWeek = new Date(
      firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset),
    );
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(startOfWeek.setDate(diff));
  }
}
