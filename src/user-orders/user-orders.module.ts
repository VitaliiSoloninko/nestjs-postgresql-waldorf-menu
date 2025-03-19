import { Module } from '@nestjs/common';
import { UserOrdersController } from './user-orders.controller';
import { UserOrdersService } from './user-orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/orders/orders.model';

@Module({
  controllers: [UserOrdersController],
  providers: [UserOrdersService],
  imports: [SequelizeModule.forFeature([Order])],
  exports: [SequelizeModule],
})
export class UserOrdersModule {}
