import { WorkerService } from './../worker/worker.service';
import { MerchandiseService } from './../merchandise/merchandise.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISaleDTO, IEditSaleDTO } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';
import { Merchandise } from 'src/merchandise/entities/merchandise.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    private merchandiseService: MerchandiseService,
    private workerService: WorkerService,
  ) {}

  async create(createSaleDTO: ISaleDTO) {
    const merchandiseData = await this.merchandiseService.getById(
      createSaleDTO.merchandiseId,
    );

    if (merchandiseData instanceof Merchandise) {
      const workerData = await this.workerService.getById(
        createSaleDTO.workerId,
      );

      if (workerData instanceof Worker) {
        const saleEntity = this.saleRepository.create();
        saleEntity.merchandiseId = merchandiseData;
        saleEntity.dateOfSale = createSaleDTO.dateOfSale;
        saleEntity.emailOfBuyer = createSaleDTO.emailOfBuyer;
        saleEntity.workerId = workerData;
        saleEntity.count = createSaleDTO.count;

        const resInsered = await this.saleRepository.save(saleEntity);
        return resInsered;
      } else {
        workerData.message = `Worker ${workerData.message}`;
        return workerData;
      }
    } else {
      merchandiseData.message = `Merchandise ${merchandiseData.message}`;
      return merchandiseData;
    }
  }

  async getAll() {
    return await this.saleRepository
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.merchandiseId', 'merchandiseId')
      .innerJoinAndSelect('s.workerId', 'workerId')
      .getMany();
  }

  async getById(id: number) {
    const res = await this.saleRepository
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.merchandiseId', 'merchandiseId')
      .innerJoinAndSelect('s.workerId', 'workerId')
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

  async update(updateSaleDTO: IEditSaleDTO) {
    const merchandiseData = await this.merchandiseService.getById(
      updateSaleDTO.merchandiseId,
    );

    if (merchandiseData instanceof Merchandise) {
      const workerData = await this.workerService.getById(
        updateSaleDTO.workerId,
      );

      if (workerData instanceof Worker) {
        const res = await this.saleRepository
          .createQueryBuilder()
          .update()
          .set({
            merchandiseId: merchandiseData,
            dateOfSale: updateSaleDTO.dateOfSale,
            emailOfBuyer: updateSaleDTO.emailOfBuyer,
            workerId: workerData,
            count: updateSaleDTO.count,
          })
          .where(`id = ${updateSaleDTO.id}`)
          .execute();
        return !!res.affected;
      } else {
        workerData.message = `Worker ${workerData.message}`;
        return workerData;
      }
    } else {
      merchandiseData.message = `Merchandise ${merchandiseData.message}`;
      return merchandiseData;
    }
  }

  async remove(id: number) {
    const res = await this.saleRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}
