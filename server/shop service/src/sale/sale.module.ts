import { WorkerModule } from './../worker/worker.module';
import { MerchandiseModule } from './../merchandise/merchandise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), MerchandiseModule, WorkerModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
