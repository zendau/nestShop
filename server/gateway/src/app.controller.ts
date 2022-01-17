import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SHOP_SERVICE') private client: ClientProxy,
    @Inject('AUTH_SERVICE') private client2: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    const res = await this.client.send('test', 'hello');
    console.log(res);
    return res;
  }

  @Get('/test')
  async getHello2() {
    const res = await this.client2.send('test', 'hello23');
    console.log(res);
    return res;
  }
}
