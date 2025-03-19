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

  async findOrdersByUserIdAndCurrentWeekAndYear(
    userId: number,
  ): Promise<Order[]> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentWeek = this.getWeekNumber(currentDate);

    return this.orderRepository.findAll({
      where: {
        userId,
        year: currentYear,
        week: currentWeek,
      },
    });
  }

  getWeekNumber(date: Date): number {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
}
