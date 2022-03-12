import { Module } from '@nestjs/common';
import { StockcontrolcardService } from './stockcontrolcard.service';
import { StockcontrolcardController } from './stockcontrolcard.controller';

@Module({
  controllers: [StockcontrolcardController],
  providers: [StockcontrolcardService]
})
export class StockcontrolcardModule {}
