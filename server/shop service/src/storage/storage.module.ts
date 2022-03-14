import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { Storage } from './entities/storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storage])],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
