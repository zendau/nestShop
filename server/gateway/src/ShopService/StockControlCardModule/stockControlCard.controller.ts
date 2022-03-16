import { editStockControlCardDTO } from './dto/editStockControlCard.dto';
import { stockControlCardDTO } from './dto/stockControlCard.dto';
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
@Controller('scc')
export class StockControlCardController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addStockControlCard(
    @Body() createStockControlCardDTO: stockControlCardDTO,
  ) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('scc/add', createStockControlCardDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editStockControlCard(
    @Body() updateStockControlCardDTO: editStockControlCardDTO,
  ) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('scc/edit', updateStockControlCardDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getStockControlCard(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('scc/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllStockControlCards() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('scc/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteStockControlCard(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('scc/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
