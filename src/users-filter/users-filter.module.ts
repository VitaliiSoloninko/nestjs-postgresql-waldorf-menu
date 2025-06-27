import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { User } from 'src/users/users.model';
import { UsersFilterController } from './users-filter.controller';
import { UsersFilterService } from './users-filter.service';

@Module({
  controllers: [UsersFilterController],
  providers: [UsersFilterService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
  exports: [UsersFilterService],
})
export class UsersFilterModule {}
