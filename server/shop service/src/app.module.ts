import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { WorkerModule } from './worker/worker.module';
import { StockcontrolcardModule } from './stockcontrolcard/stockcontrolcard.module';
import { StorageModule } from './storage/storage.module';
import { WaybillModule } from './waybill/waybill.module';
import { ProviderModule } from './provider/provider.module';
import { SaleModule } from './sale/sale.module';
import { CategoryModule } from './category/category.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [
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
    ]),
    GoodsModule,
    CategoryModule,
    SaleModule,
    ProviderModule,
    WaybillModule,
    StorageModule,
    StockcontrolcardModule,
    WorkerModule,
    RoleModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
