import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface FoodCreationAttrs {
  name: string;
  day: string;
  week: string;
  price: string;
  description: string;
  image: string;
}

@Table({ tableName: 'foods' })
export class Food extends Model<Food, FoodCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Food', description: 'Name of the food' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '1', description: 'Day' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  day: string;

  @ApiProperty({ example: '1', description: 'Week' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  week: string;

  @ApiProperty({ example: '4', description: 'Price' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    example: 'Sandwich',
    description: 'Description of the food',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '01.jpg', description: 'Image of the food' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ApiProperty({ example: 'isChecked', description: 'false' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isChecked: boolean;
}
