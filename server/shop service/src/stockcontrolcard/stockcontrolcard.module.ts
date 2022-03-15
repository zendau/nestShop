import { WaybillModule } from './../waybill/waybill.module';
import { MerchandiseModule } from './../merchandise/merchandise.module';
import { StorageModule } from './../storage/storage.module';
import { SaleModule } from './../sale/sale.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StockControlCardService } from './stockControlCard.service';
import { StockcontrolcardController } from './stockControlCard.controller';
import { StockControlCard } from './entities/stockcontrolcard.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockControlCard]),
    SaleModule,
    StorageModule,
    MerchandiseModule,
    WaybillModule,
  ],
  controllers: [StockcontrolcardController],
  providers: [StockControlCardService],
})
export class StockcontrolcardModule {}
