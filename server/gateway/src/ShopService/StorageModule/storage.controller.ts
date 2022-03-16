import { editStorageDTO } from './dto/editStorage.dto';
import { storageDTO } from './dto/storage.dto';
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
@Controller('storage')
export class StorageController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addStorage(@Body() createStorageDTO: storageDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('storage/add', createStorageDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editStorage(@Body() updateStorageDTO: editStorageDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('storage/edit', updateStorageDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getStorage(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('storage/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllStorages() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('storage/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteStorage(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('storage/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
