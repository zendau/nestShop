import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { WorkerModule } from './worker/worker.module';
import { StockcontrolcardModule } from './stockControlCard/stockControlCard.module';
import { StorageModule } from './storage/storage.module';
import { WaybillModule } from './waybill/waybill.module';
import { ProviderModule } from './provider/provider.module';
import { SaleModule } from './sale/sale.module';
import { CategoryModule } from './category/category.module';
import { MerchandiseModule } from './merchandise/merchandise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    SaleModule,
    ProviderModule,
    WaybillModule,
    StorageModule,
    StockcontrolcardModule,
    WorkerModule,
    RoleModule,
    AdminModule,
    MerchandiseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
