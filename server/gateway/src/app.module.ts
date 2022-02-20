import { RoleController } from './AuthService/RoleModule/role.controller';
import { JwtStrategy } from './AuthService/strategies/jwt.strategy';
import { RefreshStrategy } from './AuthService/strategies/refresh.strategy';
import { AuthController } from './AuthService/UserModule/auth.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:root@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SHOP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:root@localhost:5672'],
          queue: 'shop_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, RoleController],
  providers: [AppService, JwtStrategy, RefreshStrategy],
  exports: [ClientsModule],
})
export class AppModule {}
