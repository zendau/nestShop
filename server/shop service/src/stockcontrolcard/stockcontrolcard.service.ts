import { Injectable } from '@nestjs/common';
import {
  IStockControlCardDTO,
  IEditStockControlCardDTO,
} from './dto/stockcontrolcard.dto';

@Injectable()
export class StockcontrolcardService {
  create(createStockcontrolcardDto: IStockControlCardDTO) {
    return 'This action adds a new stockcontrolcard';
  }

  findAll() {
    return `This action returns all stockcontrolcard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockcontrolcard`;
  }

  update(id: number, updateStockcontrolcardDto: IEditStockControlCardDTO) {
    return `This action updates a #${id} stockcontrolcard`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockcontrolcard`;
  }
}
