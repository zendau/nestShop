import { WorkerModule } from './../worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { Storage } from './entities/storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storage]), WorkerModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
