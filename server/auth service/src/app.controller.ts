import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('test')
  async handleUserCreated(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
    console.log(context);
    return data + data;
  }
}
