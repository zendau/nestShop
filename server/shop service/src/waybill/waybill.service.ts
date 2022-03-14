import { ProviderService } from './../provider/provider.service';
import { WorkerService } from './../worker/worker.service';
import { Waybill } from './entities/waybill.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IWaybillDTO, IEditWaybillDTO } from './dto/waybill.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from 'src/worker/entities/worker.entity';
import { Provider } from 'src/provider/entities/provider.entity';

@Injectable()
export class WaybillService {
  constructor(
    @InjectRepository(Waybill)
    private waybillRepository: Repository<Waybill>,
    private workerService: WorkerService,
    private provideService: ProviderService,
  ) {}

  async create(createWaybillDTO: IWaybillDTO) {
    console.log(createWaybillDTO);
    const workerData = await this.workerService.getById(
      createWaybillDTO.recipientId,
    );

    if (workerData instanceof Worker) {
      const provideData = await this.provideService.getById(
        createWaybillDTO.providerId,
      );

      if (provideData instanceof Provider) {
        console.log('0', provideData);
        const waybillEntity = this.waybillRepository.create();
        waybillEntity.providerId = provideData;
        waybillEntity.recipientId = workerData;
        waybillEntity.waybillName = createWaybillDTO.waybillName;

        const resInsered = await this.waybillRepository.save(waybillEntity);
        console.log('1', resInsered);
        return resInsered;
      } else {
        provideData.message = `Provide ${provideData.message}`;
        return provideData;
      }
    } else {
      workerData.message = `Worker ${workerData.message}`;
      return workerData;
    }
  }

  async getAll() {
    return await this.waybillRepository
      .createQueryBuilder('w')
      .innerJoinAndSelect('w.providerId', 'providerId')
      .innerJoinAndSelect('w.recipientId', 'recipientId')
      .getMany();
  }

  async getById(id: number) {
    const res = await this.waybillRepository
      .createQueryBuilder('w')
      .innerJoinAndSelect('w.providerId', 'providerId')
      .innerJoinAndSelect('w.recipientId', 'recipientId')
      .where('w.id = :id', { id })
      .getOne();

    if (res === undefined)
      return {
        status: false,
        message: `id ${id} is not valid`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return res;
  }

  async update(updateWaybillDTO: IEditWaybillDTO) {
    const workerData = await this.workerService.getById(
      updateWaybillDTO.recipientId,
    );

    if (workerData instanceof Worker) {
      const provideData = await this.provideService.getById(
        updateWaybillDTO.providerId,
      );

      if (provideData instanceof Provider) {
        const res = await this.waybillRepository
          .createQueryBuilder()
          .update()
          .set({
            providerId: provideData,
            recipientId: workerData,
            waybillName: updateWaybillDTO.waybillName,
          })
          .where(`id = ${updateWaybillDTO.id}`)
          .execute();
        console.log(res);
        return !!res.affected;
      } else {
        provideData.message = `Provide ${provideData.message}`;
        return workerData;
      }
    } else {
      workerData.message = `Worker ${workerData.message}`;
      return workerData;
    }
  }

  async remove(id: number) {
    const res = await this.waybillRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}
