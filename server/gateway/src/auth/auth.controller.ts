import { RegisterData } from './dto/register.dto';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @Post('register')
  async register(@Body() authBody: RegisterData) {
    console.log(authBody);
    const res = await this.authServiceClient.send('auth/register', authBody);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async userInfo() {
    return 'hello, user';
  }
}
