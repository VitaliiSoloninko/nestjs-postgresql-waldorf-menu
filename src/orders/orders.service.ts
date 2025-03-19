import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/orders/orders.model';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async createOrUpdateOrders(dtos: CreateOrderDto[]): Promise<Order[]> {
    const orders = await Promise.all(
      dtos.map(async (dto) => {
        const existingOrder = await this.orderRepository.findOne({
          where: {
            userId: dto.userId,
            date: dto.date,
          },
        });

        if (existingOrder) {
          if (dto.ordered === false) {
            await existingOrder.destroy();
            return null;
          } else {
            Object.assign(existingOrder, dto);
            return await existingOrder.save();
          }
        } else {
          if (dto.ordered === false) {
            return null;
          } else {
            return await this.orderRepository.create(dto);
          }
        }
      }),
    );

    return orders.filter((order) => order !== null);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders;
  }

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll({ where: { userId } });
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

  async findOrdersByUserIdAndPreviousMonthAndYear(
    userId: number,
  ): Promise<Order[]> {
    const currentDate = new Date();
    let previousMonth = currentDate.getMonth();
    let previousYear = currentDate.getFullYear();

    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear -= 1;
    }

    return this.orderRepository.findAll({
      where: {
        userId,
        year: previousYear,
        month: previousMonth,
      },
    });
  }

  async remove(id: number) {
    const order = await this.orderRepository.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    return await order.destroy();
  }
}
