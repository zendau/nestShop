import { RegisterData } from './dto/register.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @Post('register')
  async register(@Body() authBody: RegisterData) {
    const res = await this.authServiceClient.send('auth/register', authBody);
    console.log(res);
    return res;
  }
}
