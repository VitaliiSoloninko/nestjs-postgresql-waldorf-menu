import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateFood(id: number, dto: CreateFoodDto) {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException();
    }
    Object.assign(food, dto);

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
