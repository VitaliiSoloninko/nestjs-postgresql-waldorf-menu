import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5500,
      username: 'postgres',
      password: 'admin',
      database: 'waldorf-menu',
      models: [],
      autoLoadModels: true,
    }),
    FoodsModule,
  ],
})
export class AppModule {}
