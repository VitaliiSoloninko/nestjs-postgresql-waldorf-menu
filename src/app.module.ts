import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'waldorf-menu',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
