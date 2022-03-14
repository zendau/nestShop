import { editMerchandiseDTO } from './dto/editMerchandise.dto';
import { merchandiseDTO } from './dto/merchandise.dto';
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
@Controller('merchandise')
export class MerchandiseController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addMerchandise(@Body() createMerchandiseDTO: merchandiseDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('merchandise/add', createMerchandiseDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editMerchandise(@Body() updateMerchandiseDTO: editMerchandiseDTO) {
    console.log(updateMerchandiseDTO);
    const res = await firstValueFrom(
      this.shopServiceClient.send('merchandise/edit', updateMerchandiseDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getMerchandise(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('merchandise/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllMerchandises() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('merchandise/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteMerchandise(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('merchandise/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
