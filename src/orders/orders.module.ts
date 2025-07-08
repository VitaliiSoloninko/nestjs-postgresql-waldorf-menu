import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from 'src/mail/mail/mail.module';
import { OrdersController } from './orders.controller';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SequelizeModule.forFeature([Order]), MailModule],
  exports: [SequelizeModule],
})
export class OrdersModule {}
