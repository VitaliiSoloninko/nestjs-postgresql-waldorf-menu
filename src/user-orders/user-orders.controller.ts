import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from 'src/orders/orders.model';
import { UserOrdersService } from './user-orders.service';

@ApiTags('User Orders')
@Controller('api/orders')
export class UserOrdersController {
  constructor(private readonly userOrdersService: UserOrdersService) {}

  @ApiOperation({ summary: 'Find all orders by userID' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId')
  findOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserId(userId);
  }

  @ApiOperation({
    summary: 'Find orders by userID, current year',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId/year/current')
  findOrdersByUserIdAndCurrentYear(
    @Param('userId') userId: number,
  ): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserIdAndCurrentYear(userId);
  }

  @ApiOperation({
    summary: 'Find orders by userID, specified month, year',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId/month/:monthNumber')
  findOrdersByUserIdAndMonthAndYear(
    @Param('userId') userId: number,
    @Param('monthNumber') monthNumber: number,
  ): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserIdAndMonthAndYear(
      userId,
      monthNumber,
    );
  }

  @ApiOperation({
    summary: 'Find orders by userID, specified week, year',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user-orders/:userId/week/:weekNumber')
  findOrdersByUserIdAndWeekAndYear(
    @Param('userId') userId: number,
    @Param('weekNumber') weekNumber: number,
  ): Promise<Order[]> {
    return this.userOrdersService.findOrdersByUserIdAndWeekAndYear(
      userId,
      weekNumber,
    );
  }
}
