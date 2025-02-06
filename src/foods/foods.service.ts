import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './foods.model';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food) private foodRepository: typeof Food) {}

  async createFood(dto: CreateFoodDto) {
    const food = await this.foodRepository.create(dto);
    return food;
  }

  async findAllFoods(): Promise<Food[]> {
    const foods = await this.foodRepository.findAll();
    return foods;
  }

  async findOneFood(id: number) {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException();
    }
    return food;
  }

  async updateFood(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException();
    }
    Object.assign(food, updateFoodDto);
    return await food.save();
  }

  async removeFood(id: number) {
    const food = await this.foodRepository.findByPk(id);
    if (!food) {
      throw new NotFoundException();
    }
    return await food.destroy();
  }
}
