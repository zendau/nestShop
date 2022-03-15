import { Worker } from 'src/worker/entities/worker.entity';
import { WorkerService } from './../worker/worker.service';
import { Storage } from './entities/storage.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IStorageDTO, IEditStorageDTO } from './dto/storage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    private workerService: WorkerService,
  ) {}

  async create(createStorageDTO: IStorageDTO) {
    const workerData = await this.workerService.getById(
      createStorageDTO.workerId,
    );
    if (workerData instanceof Worker) {
      const storageEntity = this.storageRepository.create();
      storageEntity.address = createStorageDTO.address;
      storageEntity.workers.push(workerData);
      const resInsered = await this.storageRepository.save(storageEntity);
      return resInsered;
    } else {
      workerData.message = `Worker ${workerData.message}`;
      return workerData;
    }
  }

  async getAll() {
    return await this.storageRepository
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.workers', 'workers')
      .getMany();
  }

  async getById(id: number) {
    const res = await this.storageRepository
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.workers', 'workers')
      .where('s.id = :id', { id })
      .getOne();

    if (res === undefined)
      return {
        status: false,
        message: `id ${id} is not valid`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return res;
  }

  async update(updateStorageDTO: IEditStorageDTO) {
    const workerData = await this.workerService.getById(
      updateStorageDTO.workerId,
    );

    if (workerData instanceof Worker) {
      const StorageData = await this.getById(updateStorageDTO.id);

      if (StorageData instanceof Storage) {
        StorageData.workers = StorageData.workers.filter((item) => {
          return item.workerId !== updateStorageDTO.workerId;
        });
        StorageData.address = updateStorageDTO.address;
        StorageData.workers.push(workerData);
        return await this.storageRepository.save(StorageData);
      } else {
        StorageData.message = `Storage ${StorageData.message}`;
        return StorageData;
      }
    } else {
      workerData.message = `Worker ${workerData.message}`;
      return workerData;
    }
  }

  async remove(id: number) {
    const res = await this.storageRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}
