import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Create or update orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Post()
  createOrUpdateOrders(@Body() createOrderDtos: CreateOrderDto[]) {
    return this.orderService.createOrUpdateOrders(createOrderDtos);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  findAllOrders() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Find all orders by user ID' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user/:userId')
  findOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.orderService.findOrdersByUserId(userId);
  }

  @ApiOperation({ summary: 'Find all orders by date' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('date/:date')
  findOrdersByDate(@Param('date') date: string): Promise<Order[]> {
    return this.orderService.findOrdersByDate(date);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  removeOrder(@Param('id') id: number) {
    return this.orderService.remove(id);
  }
}
