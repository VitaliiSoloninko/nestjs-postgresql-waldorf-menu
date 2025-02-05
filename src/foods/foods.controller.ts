import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './foods.model';
import { FoodsService } from './foods.service';

@ApiTags('Foods')
@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @ApiOperation({ summary: 'Create food' })
  @ApiResponse({ status: 200, type: CreateFoodDto })
  @Post()
  createFood(@Body() foodDto: CreateFoodDto) {
    return this.foodService.createFood(foodDto);
  }

  @ApiOperation({ summary: 'Get all foods' })
  @ApiResponse({ status: 200, type: [Food] })
  @Get()
  getAllFoods() {
    return this.foodService.getAllFoods();
  }
}
