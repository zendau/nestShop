import { User } from './users.entity';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private UsersService: UsersService) {}
}
