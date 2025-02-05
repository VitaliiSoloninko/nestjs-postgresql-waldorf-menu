import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Post()
  createFood(@Body() foodDto: CreateFoodDto) {
    return this.foodService.createFood(foodDto);
  }

  @Get()
  getAllFoods() {
    return this.foodService.getAllFoods();
  }
}
