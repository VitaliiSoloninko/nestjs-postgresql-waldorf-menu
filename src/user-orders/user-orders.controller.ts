import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from 'src/orders/orders.model';
import { UserOrdersService } from './user-orders.service';

@ApiTags('User Orders')
@Controller('api/orders')
export class UserOrdersController {
  constructor(private readonly userOrdersService: UserOrdersService) {}

  @ApiOperation({ summary: 'Find all orders by user ID' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId')
  findOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserId(userId);
  }

  @ApiOperation({
    summary: 'Find orders by userID, current month, year',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId/month/current')
  findOrdersByUserIdAndCurrentMonthAndYear(
    @Param('userId') userId: number,
  ): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserIdAndCurrentMonthAndYear(
      userId,
    );
  }

  @ApiOperation({
    summary: 'Find orders by userID, current week, year',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId/week/current')
  findOrdersByUserIdAndCurrentWeekAndYear(
    @Param('userId') userId: number,
  ): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserIdAndCurrentMonthAndYear(
      userId,
    );
  }
}
