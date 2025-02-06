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
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './foods.model';
import { FoodsService } from './foods.service';

@ApiTags('Foods')
@Controller('api/foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @ApiOperation({ summary: 'Create food' })
  @ApiResponse({ status: 200, type: CreateFoodDto })
  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @ApiOperation({ summary: 'Get all foods' })
  @ApiResponse({ status: 200, type: [Food] })
  @Get()
  findAllFoods() {
    return this.foodService.findAllFoods();
  }

  @ApiOperation({ summary: 'Get one food' })
  @ApiResponse({ status: 200, type: Food })
  @Get(':id')
  findOneFood(@Param('id') id: number) {
    return this.foodService.findOneFood(id);
  }

  @ApiOperation({ summary: 'Update food' })
  @ApiResponse({ status: 200, type: CreateFoodDto })
  @Patch(':id')
  updateFood(@Param('id') id: number, @Body() createFoodDto: CreateFoodDto) {
    return this.foodService.updateFood(id, createFoodDto);
  }

  @ApiOperation({ summary: 'Delete food' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  removeFood(@Param('id') id: number) {
    return this.foodService.removeFood(id);
  }
}
