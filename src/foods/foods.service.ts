import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './foods.model';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food) private foodRepository: typeof Food) {}

  async createFood(dto: CreateFoodDto) {
    const food = await this.foodRepository.create(dto);
    return food;
  }

  async getAllFoods() {
    const foods = await this.foodRepository.findAll();
    return foods;
  }
}
