import { StockControlCardController } from './ShopService/StockControlCardModule/stockControlCard.controller';
import { SaleController } from './ShopService/SaleModule/sale.controller';
import { StorageController } from './ShopService/StorageModule/storage.controller';
import { WaybillController } from './ShopService/WaybillModule/waybill.controller';
import { WorkerController } from './ShopService/WorkerModule/worker.controller';
import { MerchandiseController } from './ShopService/MerchandiseModule/merchandise.controller';
import { CategoryController } from './ShopService/CategoryModule/category.controller';
import { ProviderController } from './ShopService/ProviderModule/provider.controller';
import { RoleController } from './AuthService/RoleModule/role.controller';
import { JwtStrategy } from './AuthService/strategies/jwt.strategy';
import { RefreshStrategy } from './AuthService/strategies/refresh.strategy';
import { AuthController } from './AuthService/UserModule/auth.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WorkerRoleController } from './ShopService/RoleModule/role.controller';

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
  controllers: [
    AppController,
    AuthController,
    RoleController,
    ProviderController,
    WorkerRoleController,
    CategoryController,
    MerchandiseController,
    WorkerController,
    WaybillController,
    StorageController,
    SaleController,
    StockControlCardController,
  ],
  providers: [AppService, JwtStrategy, RefreshStrategy],
  exports: [ClientsModule],
})
export class AppModule {}
