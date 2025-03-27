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

  async findOrdersByDate(date: string): Promise<Order[]> {
    return this.orderRepository.findAll({ where: { date } });
  }

  async remove(id: number) {
    const order = await this.orderRepository.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    return await order.destroy();
  }
}
