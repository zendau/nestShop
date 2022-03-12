import { Injectable } from '@nestjs/common';
import { CreateStockcontrolcardDto } from './dto/create-stockcontrolcard.dto';
import { UpdateStockcontrolcardDto } from './dto/update-stockcontrolcard.dto';

@Injectable()
export class StockcontrolcardService {
  create(createStockcontrolcardDto: CreateStockcontrolcardDto) {
    return 'This action adds a new stockcontrolcard';
  }

  findAll() {
    return `This action returns all stockcontrolcard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockcontrolcard`;
  }

  update(id: number, updateStockcontrolcardDto: UpdateStockcontrolcardDto) {
    return `This action updates a #${id} stockcontrolcard`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockcontrolcard`;
  }
}
