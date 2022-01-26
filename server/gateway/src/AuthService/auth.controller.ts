import { ValidationPipe } from '../pipes/validation.pipe';
import { RegisterData } from './dto/register.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { first, firstValueFrom, map, Observable } from 'rxjs';
import { LoginData } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() authBody: RegisterData) {
    const res = await firstValueFrom(
      this.authServiceClient.send('auth/register', authBody),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    console.log('1', res);
    return res;
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() authBody: LoginData) {
    const res = await firstValueFrom(
      this.authServiceClient.send('auth/login', authBody),
    );

    if (res.status === false) {
      throw new HttpException(res.message, res.httpCode);
    }
    console.log('1', res);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async userInfo() {
    return 'hello, user';
  }
}
