import { CategoryModule } from './../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { MerchandiseController } from './merchandise.controller';
import { Merchandise } from './entities/merchandise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Merchandise]), CategoryModule],
  controllers: [MerchandiseController],
  providers: [MerchandiseService],
})
export class MerchandiseModule {}
