import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'test@gmail', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: 'John', description: 'First name of the child' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstNameChild: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the child' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastNameChild: string;

  @ApiProperty({ example: 'Street', description: 'Street' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: '1', description: 'Number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @ApiProperty({ example: '19053', description: 'Postal code' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCode: string;

  @ApiProperty({ example: 'Schwerin', description: 'City' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({ example: 'Waldorf', description: 'School' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  school: string;

  @ApiProperty({ example: '1', description: 'Class' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  class: string;

  @ApiProperty({ example: 'A', description: 'Letter' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  letter: string;

  @ApiProperty({ example: 'true', description: 'Is email confirmed' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  emailConfirmed: boolean;

  @ApiProperty({ example: 'true', description: 'Is address confirmed' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  addressConfirmed: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
