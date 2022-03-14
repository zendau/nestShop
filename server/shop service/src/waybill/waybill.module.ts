import { ProviderModule } from './../provider/provider.module';
import { WorkerModule } from './../worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { WaybillController } from './waybill.controller';
import { Waybill } from './entities/waybill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Waybill]), WorkerModule, ProviderModule],
  controllers: [WaybillController],
  providers: [WaybillService],
})
export class WaybillModule {}
