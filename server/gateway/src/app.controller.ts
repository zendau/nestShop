import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { JwtAuthGuard } from './AuthService/guards/jwt-auth.guard';
import { Role } from './AuthService/enum/role.enum';
import { Roles } from './AuthService/decorators/roles.decorator';
import { RolesGuard } from './AuthService/guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private AppService: AppService,
    @Inject('SHOP_SERVICE') private client: ClientProxy,
    @Inject('AUTH_SERVICE') private client2: ClientProxy,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getHello() {
    return true;
  }
}
