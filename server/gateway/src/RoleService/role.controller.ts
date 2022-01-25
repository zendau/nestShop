import { roleDataDTO } from './dto/roleData.dto';
import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('role')
export class RoleController {
  constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @Post('add')
  async addNewRole(roleData: roleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/add', roleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Put('edit')
  async editRole(roleData: roleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/edit', roleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Post('setUserRole')
  async addUserRole(userRoleData: roleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/setUserRole', userRoleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Put('editUserRole')
  async editUserRole(userRoleData: roleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/editUserRole', userRoleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Get('get')
  async getRoles() {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/get', null),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Get('getUsersRole/:id')
  async getUserRoles(@Param() roleId: number) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/getUsersRole', roleId),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
