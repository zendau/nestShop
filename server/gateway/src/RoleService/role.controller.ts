import { userRoleDataDTO } from './dto/userRole.dto';
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
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorDTO } from 'src/globalDTO/httpError.dto';
@ApiTags('Auth microservice - Role controller')
@Controller('role')
export class RoleController {
  constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @ApiOperation({ summary: 'Register new role' })
  @ApiResponse({ status: 200, type: roleDataDTO })
  @ApiResponse({ status: 400, type: HttpErrorDTO })
  @UsePipes(ValidationPipe)
  @Post('add')
  async addNewRole(@Body() roleData: roleDataDTO) {
    console.log(roleData);
    const res = await firstValueFrom(
      this.authServiceClient.send('role/add', roleData),
    );
    console.log(res);
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Patch('edit')
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
  async addUserRole(@Body() userRoleData: userRoleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/setUserRole', userRoleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Patch('editUserRole')
  async editUserRole(@Body() userRoleData: userRoleDataDTO) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/editUserRole', userRoleData),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @Get('getUsersRole/:roleId')
  async getUsersRole(@Param() param) {
    const res = await firstValueFrom(
      this.authServiceClient.send('role/getUsersRole', param.roleId),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
