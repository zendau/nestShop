import { editRoleDTO } from './dto/editRole.dto';
import { roleDTO } from './dto/role.dto';
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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorDTO } from 'src/AuthService/dto/httpError.dto';
@ApiTags('Auth microservice - Role controller')
@Controller('workerRole')
export class WorkerRoleController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addWorkerRole(@Body() createWorkerRoleDTO: roleDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('workerRole/add', createWorkerRoleDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editWorkerRole(@Body() updateWorkerRoleDTO: editRoleDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('workerRole/edit', updateWorkerRoleDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getWorkerRole(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('workerRole/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllWorkerRoles() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('workerRole/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteWorkerRole(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('workerRole/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
