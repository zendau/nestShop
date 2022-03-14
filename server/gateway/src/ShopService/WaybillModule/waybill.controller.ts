import { editWaybillDTO } from './dto/editWaybill.dto';
import { waybillDTO } from './dto/waybill.dto';
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
@Controller('waybill')
export class waybillController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addwaybill(@Body() createwaybillDTO: waybillDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('waybill/add', createwaybillDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editwaybill(@Body() updatewaybillDTO: editWaybillDTO) {
    console.log(updatewaybillDTO);
    const res = await firstValueFrom(
      this.shopServiceClient.send('waybill/edit', updatewaybillDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getwaybill(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('waybill/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllwaybills() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('waybill/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deletewaybill(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('waybill/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
