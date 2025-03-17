import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface OrderCreationAttrs {
  foodId: number;
  name: string;
  price: number;
  date: string;
  userId: number;
  day: number;
  week: number;
  month: number;
  year: number;
  ordered: boolean;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Food ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  foodId: number;

  @ApiProperty({ example: 'Menu 1', description: 'Menu number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 4, description: 'Food price' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: '11.03.2025', description: 'Date' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;

  @ApiProperty({ example: '1', description: 'User ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({ example: '11', description: 'Day' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  day: number;

  @ApiProperty({ example: '11', description: 'Week' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  week: number;

  @ApiProperty({ example: '03', description: 'Month' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  month: number;

  @ApiProperty({ example: '2025', description: 'Year' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @ApiProperty({ example: 'true', description: 'Ordered' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  ordered: boolean;
}
