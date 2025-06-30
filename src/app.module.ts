import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { Food } from './foods/foods.model';
import { FoodsModule } from './foods/foods.module';
import { Order } from './orders/orders.model';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { UserOrdersModule } from './user-orders/user-orders.module';
import { UsersFilterModule } from './users-filter/users-filter.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { MailService } from './mail/mail/mail.service';

@Module({
  controllers: [],
  providers: [MailService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Food, User, Role, UserRoles, Order],
      autoLoadModels: true,
    }),
    FoodsModule,
    UsersModule,
    UsersFilterModule,
    RolesModule,
    AuthModule,
    ProfileModule,
    OrdersModule,
    UserOrdersModule,
  ],
})
export class AppModule {}
