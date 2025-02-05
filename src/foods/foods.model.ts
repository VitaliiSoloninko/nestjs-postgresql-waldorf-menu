import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface FoodCreationAttrs {
  name: string;
  week: string;
  price: string;
  description: string;
  image: string;
}

@Table({ tableName: 'foods' })
export class Food extends Model<Food, FoodCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  week: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;
}
