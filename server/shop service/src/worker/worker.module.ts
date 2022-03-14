import { RoleModule } from './../role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { Worker } from './entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker]), RoleModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
