import { Role } from './role.entity';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UserRole } from './userRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, UserRole])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
