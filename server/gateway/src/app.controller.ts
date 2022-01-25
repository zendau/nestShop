import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Role } from './enum/role.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private AppService: AppService,
    @Inject('SHOP_SERVICE') private client: ClientProxy,
    @Inject('AUTH_SERVICE') private client2: ClientProxy,
  ) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getHello() {
    return true;
  }

  @Get('/test')
  async getHello2() {
    const res = await this.client2.send('test', '');
    console.log(res);
    return res;
  }
}
