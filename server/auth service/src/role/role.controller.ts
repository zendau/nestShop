import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserRole } from './dto/userRole.dto';
import IEditUserData from './interfaces/IEditUserData';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @MessagePattern('role/add')
  async addNewRole(@Payload() roleData: Role) {
    const res = await this.roleService.addNewRole(roleData).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('role/edit')
  async editRole(@Payload() roleData: IEditUserData) {
    const res = await this.roleService.updateRole(roleData).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('role/get')
  async getRoles() {
    const res = await this.roleService.getRoles().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('role/delete')
  async deleteRole(@Payload() roleId: number) {
    const res = await this.roleService.deleteRole(roleId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('role/setUserRole')
  async addUserRole(@Payload() userRoleData: UserRole) {}

  @MessagePattern('role/editUserRole')
  async editUserRole(@Payload() userRoleData: UserRole) {}

  @MessagePattern('role/getUsersRole')
  async getUserRoles(@Payload() roleId: number) {}
}
