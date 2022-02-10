import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import IUser from './users/interfaces/IUserData';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private UsersService: UsersService,
  ) {}

  @MessagePattern('auth/register')
  async registerUser(@Payload() userData: IUser) {
    const res = await this.UsersService.register(userData, true).catch(
      (err) => {
        console.log(err);
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      },
    );
    return res;
  }

  @MessagePattern('auth/login')
  async loginUser(@Payload() userData: IUser) {
    const res = await this.UsersService.login(userData);
    return res;
  }
}
