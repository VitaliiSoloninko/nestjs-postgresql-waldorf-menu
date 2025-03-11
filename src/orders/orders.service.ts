import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/orders/orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  async create(dto: CreateOrderDto) {
    const order = await this.orderRepository.create(dto);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders;
  }

  findAllByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll({ where: { userId } });
  }

  findAllByUserIdAndActiveMonthAndYear(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll({
      where: {
        userId,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException();
    }
    Object.assign(order, updateOrderDto);
    return await order.save();
  }

  async remove(id: number) {
    const order = await this.orderRepository.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    return await order.destroy();
  }
}
