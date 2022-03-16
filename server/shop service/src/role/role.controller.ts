import { Body, Controller, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { IRoleDTO, IEditRoleDTO } from './dto/role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern('workerRole/add')
  async addRole(@Body() createRoleData: IRoleDTO) {
    console.log(createRoleData);
    const res = await this.roleService.create(createRoleData).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('workerRole/getAll')
  async getAllRoles() {
    const res = await this.roleService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('workerRole/get')
  async getRole(@Payload() roleId: number) {
    const res = await this.roleService.getById(roleId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('workerRole/edit')
  async editRole(@Body() updateRoleDto: IEditRoleDTO) {
    const res = await this.roleService.update(updateRoleDto).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('workerRole/delete')
  async deleteRole(@Payload() roleId: number) {
    const res = await this.roleService.remove(roleId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}
