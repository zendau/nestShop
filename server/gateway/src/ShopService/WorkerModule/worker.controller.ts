import { editWorkerDTO } from './dto/editWorker.dto';
import { workerDTO } from './dto/worker.dto';
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
@Controller('worker')
export class WorkerController {
  constructor(@Inject('SHOP_SERVICE') private shopServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('add')
  async addWorker(@Body() createWorkerDTO: workerDTO) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('worker/add', createWorkerDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Patch('edit')
  async editWorker(@Body() updateWorkerDTO: editWorkerDTO) {
    console.log(updateWorkerDTO);
    const res = await firstValueFrom(
      this.shopServiceClient.send('worker/edit', updateWorkerDTO),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('get/:id')
  async getWorker(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('worker/get', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Get('getAll')
  async getAllWorkers() {
    const res = await firstValueFrom(
      this.shopServiceClient.send('worker/getAll', ''),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }

  @UsePipes(ValidationPipe)
  @Delete('delete/:id')
  async deleteWorker(@Param() params) {
    const res = await firstValueFrom(
      this.shopServiceClient.send('worker/delete', params.id),
    );
    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    return res;
  }
}
