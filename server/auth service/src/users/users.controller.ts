import { User } from './users.entity';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @MessagePattern('auth/register')
  async registerUser(@Payload() userData: User) {
    console.log(userData);
    const res = await this.UsersService.create(userData);
    console.log(res, "TETS");
    return res;
  }
}
