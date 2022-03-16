import { Waybill } from './../waybill/entities/waybill.entity';
import { SaleService } from './../sale/sale.service';
import { StorageService } from './../storage/storage.service';
import { MerchandiseService } from './../merchandise/merchandise.service';
import { WaybillService } from './../waybill/waybill.service';
import { StockControlCard } from './entities/stockcontrolcard.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  IStockControlCardDTO,
  IEditStockControlCardDTO,
} from './dto/stockcontrolcard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchandise } from 'src/merchandise/entities/merchandise.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { Sale } from 'src/sale/entities/sale.entity';

@Injectable()
export class StockControlCardService {
  constructor(
    @InjectRepository(StockControlCard)
    private stockControlCardRepository: Repository<StockControlCard>,
    private waybillService: WaybillService,
    private merchandiseService: MerchandiseService,
    private storageService: StorageService,
    private saleService: SaleService,
  ) {}

  async create(createStockControlCardDTO: IStockControlCardDTO) {
    const waybillData = await this.waybillService.getById(
      createStockControlCardDTO.waybillId,
    );

    if (waybillData instanceof Waybill) {
      const MerchandiseData = await this.merchandiseService.getById(
        createStockControlCardDTO.MerchandiseId,
      );

      if (MerchandiseData instanceof Merchandise) {
        const StorageData = await this.storageService.getById(
          createStockControlCardDTO.storageId,
        );

        if (StorageData instanceof Storage) {
          const SaleData = await this.saleService.getById(
            createStockControlCardDTO.saleId,
          );

          if (SaleData instanceof Sale) {
            const stockControlCardEntity =
              this.stockControlCardRepository.create();
            stockControlCardEntity.arrivedDate =
              createStockControlCardDTO.arrivedDate;
            stockControlCardEntity.MerchandiseId = MerchandiseData;
            stockControlCardEntity.issueDate =
              createStockControlCardDTO.issueDate;
            stockControlCardEntity.place = createStockControlCardDTO.place;
            stockControlCardEntity.price = createStockControlCardDTO.price;
            stockControlCardEntity.saleId = SaleData;
            stockControlCardEntity.storageId = StorageData;
            stockControlCardEntity.waybillId = waybillData;
            stockControlCardEntity.salePrice =
              createStockControlCardDTO.salePrice;

            const resInsered = await this.stockControlCardRepository.save(
              stockControlCardEntity,
            );
            console.log('1', resInsered);
            return resInsered;
          } else {
            SaleData.message = `SaleData ${SaleData.message}`;
            return SaleData;
          }
        } else {
          StorageData.message = `Storage${StorageData.message}`;
          return StorageData;
        }
      } else {
        MerchandiseData.message = `MerchandiseData ${MerchandiseData.message}`;
        return MerchandiseData;
      }
    } else {
      waybillData.message = `Waybill ${waybillData.message}`;
      return waybillData;
    }
  }

  async getAll() {
    return await this.stockControlCardRepository
      .createQueryBuilder('scc')
      .innerJoinAndSelect('scc.waybillId', 'waybillId')
      .innerJoinAndSelect('scc.MerchandiseId', 'MerchandiseId')
      .innerJoinAndSelect('scc.storageId', 'storageId')
      .innerJoinAndSelect('scc.saleId', 'saleId')
      .getMany();
  }

  async getById(id: number) {
    const res = await this.stockControlCardRepository
      .createQueryBuilder('scc')
      .innerJoinAndSelect('scc.waybillId', 'waybillId')
      .innerJoinAndSelect('scc.MerchandiseId', 'MerchandiseId')
      .innerJoinAndSelect('scc.storageId', 'storageId')
      .innerJoinAndSelect('scc.saleId', 'saleId')
      .where('scc.id = :id', { id })
      .getOne();

    if (res === undefined)
      return {
        status: false,
        message: `id ${id} is not valid`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return res;
  }

  async update(updateStockControlCardDTO: IEditStockControlCardDTO) {
    const waybillData = await this.waybillService.getById(
      updateStockControlCardDTO.waybillId,
    );

    if (waybillData instanceof Waybill) {
      const MerchandiseData = await this.merchandiseService.getById(
        updateStockControlCardDTO.MerchandiseId,
      );

      if (MerchandiseData instanceof Merchandise) {
        const StorageData = await this.storageService.getById(
          updateStockControlCardDTO.storageId,
        );

        if (StorageData instanceof Storage) {
          const SaleData = await this.saleService.getById(
            updateStockControlCardDTO.saleId,
          );

          if (SaleData instanceof Sale) {
            const res = await this.stockControlCardRepository
              .createQueryBuilder()
              .update()
              .set({
                MerchandiseId: MerchandiseData,
                issueDate: updateStockControlCardDTO.issueDate,
                place: updateStockControlCardDTO.place,
                price: updateStockControlCardDTO.price,
                saleId: SaleData,
                storageId: StorageData,
                waybillId: waybillData,
                salePrice: updateStockControlCardDTO.salePrice,
              })
              .where(`id = ${updateStockControlCardDTO.id}`)
              .execute();
            console.log(res);
            return !!res.affected;
          } else {
            SaleData.message = `SaleData ${SaleData.message}`;
            return SaleData;
          }
        } else {
          StorageData.message = `Storage${StorageData.message}`;
          return StorageData;
        }
      } else {
        MerchandiseData.message = `MerchandiseData ${MerchandiseData.message}`;
        return MerchandiseData;
      }
    } else {
      waybillData.message = `Waybill ${waybillData.message}`;
      return waybillData;
    }
  }

  async remove(id: number) {
    const res = await this.stockControlCardRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}
