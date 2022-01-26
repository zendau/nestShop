import { editRoleDataDTO } from './dto/editRoleData.dto';
import { roleDataDTO } from './dto/roleData.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('role')
export class RoleController {
  constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addNewRole(@Body() roleData: roleDataDTO) {
    console.log(roleData);
    const res = await firstValueFrom(
      this.authServiceClient.send('role/add', roleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Put('edit')
  async editRole(@Body() roleData: editRoleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/edit', roleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Get('get')
  async getRoles() {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/get', ''),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Delete('delete/:roleId')
  async deleteRole(@Param() params) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/delete', params.roleId),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Post('setUserRole')
  async addUserRole(@Body() userRoleData: roleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/setUserRole', userRoleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Put('editUserRole')
  async editUserRole(@Body() userRoleData: roleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/editUserRole', userRoleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Get('getUsersRole/:roleId')
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
