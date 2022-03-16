import { editProviderDTO } from './dto/editProvider.dto';
import { providerDTO } from './dto/provider.dto';
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
@Controller('provider')
export class ProviderController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addProvider(@Body() createProviderDTO: providerDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('provider/add', createProviderDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editProvider(@Body() updateProviderDTO: editProviderDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('provider/edit', updateProviderDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getProvider(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('provider/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllProviders() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('provider/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteProvider(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('provider/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
