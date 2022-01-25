import { UserRole } from './userRole.entity';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Role } from './role.entity';

@Controller('role')
export class RoleController {
  @MessagePattern('role/add')
  async addNewRole(@Payload() roleData: Role) {}

  @MessagePattern('role/edit')
  async editRole(@Payload() roleData: Role) {}

  @MessagePattern('role/setUserRole')
  async addUserRole(@Payload() userRoleData: UserRole) {}

  @MessagePattern('role/editUserRole')
  async editUserRole(@Payload() userRoleData: UserRole) {}

  @MessagePattern('role/get')
  async getRoles() {}

  @MessagePattern('role/getUsersRole')
  async getUserRoles(@Payload() roleId: number) {}
}
