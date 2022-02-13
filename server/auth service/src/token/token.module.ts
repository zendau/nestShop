import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from './token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({}),
    forwardRef(() => UsersModule),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
