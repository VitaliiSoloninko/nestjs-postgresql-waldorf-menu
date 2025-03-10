import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  findAllOrders() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get one order' })
  @ApiResponse({ status: 200, type: Order })
  @Get(':id')
  findOneOrder(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Patch(':id')
  updateOrder(@Param('id') id: number, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.update(id, createOrderDto);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  removeOrder(@Param('id') id: number) {
    return this.orderService.remove(id);
  }
}
