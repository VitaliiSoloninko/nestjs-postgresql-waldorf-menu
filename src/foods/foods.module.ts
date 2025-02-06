import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FoodsController } from './foods.controller';
import { Food } from './foods.model';
import { FoodsService } from './foods.service';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService],
  imports: [SequelizeModule.forFeature([Food])],
  exports: [SequelizeModule],
})
export class FoodsModule {}
