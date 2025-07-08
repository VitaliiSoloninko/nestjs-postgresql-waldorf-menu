import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MailService } from 'src/mail/mail/mail.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private mailService: MailService,
  ) {}

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

  @ApiOperation({ summary: 'Get orders per month' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('filter-by-month')
  filterOrdersByMonth(
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (isNaN(monthNumber) || isNaN(yearNumber)) {
      throw new BadRequestException('Invalid month or year');
    }

    return this.orderService.findOrdersByMonth(monthNumber, yearNumber);
  }

  @ApiOperation({ summary: 'Get orders by date' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('date/:date')
  findOrdersByDate(@Param('date') date: string): Promise<Order[]> {
    return this.orderService.findOrdersByDate(date);
  }

  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('user/:userId')
  findOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.orderService.findOrdersByUserId(userId);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  removeOrder(@Param('id') id: number) {
    return this.orderService.remove(id);
  }

  @Post('send-invoice')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        userId: { type: 'string' },
        email: { type: 'string' },
        month: { type: 'string' },
        year: { type: 'string' },
      },
    },
  })
  async sendInvoice(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('email') email: string,
    @Body('month') month: string,
    @Body('year') year: string,
  ) {
    try {
      await this.mailService.sendInvoiceInPDF(email, file, month, year);
      return { message: 'Invoice sent successfully' };
    } catch (e) {
      return { message: 'Error sending invoice', error: e.message };
    }
  }
}
