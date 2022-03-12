import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StockcontrolcardService } from './stockcontrolcard.service';
import { StockcontrolcardController } from './stockcontrolcard.controller';
import { Stockcontrolcard } from './entities/stockcontrolcard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stockcontrolcard])],
  controllers: [StockcontrolcardController],
  providers: [StockcontrolcardService],
})
export class StockcontrolcardModule {}
