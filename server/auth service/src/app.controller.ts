import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private UsersService: UsersService,
  ) {}

  @MessagePattern('auth/register')
  async registerUser(@Payload() userData: User) {
    console.log('1', userData);
    const res = await this.UsersService.create(userData);
    console.log('2', res);
    return res;
  }
}
