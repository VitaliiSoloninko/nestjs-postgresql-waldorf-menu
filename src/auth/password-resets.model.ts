import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({ tableName: 'password_resets', timestamps: false })
export class PasswordReset extends Model<
  PasswordReset,
  { userId: number; token: string; expires: Date }
> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  token: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expires: Date;

  @BelongsTo(() => User)
  user: User;
}
