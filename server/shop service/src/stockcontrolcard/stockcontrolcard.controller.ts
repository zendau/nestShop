import { Controller, Body, HttpStatus } from '@nestjs/common';
import { StockControlCardService } from './stockControlCard.service';
import {
  IStockControlCardDTO,
  IEditStockControlCardDTO,
} from './dto/stockcontrolcard.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class StockcontrolcardController {
  constructor(
    private readonly stockControlCardService: StockControlCardService,
  ) {}

  @MessagePattern('scc/add')
  async addStockControlCard(
    @Body() createStockControlCardData: IStockControlCardDTO,
  ) {
    const res = await this.stockControlCardService
      .create(createStockControlCardData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('scc/getAll')
  async getAllStockControlCards() {
    const res = await this.stockControlCardService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('scc/get')
  async getStockControlCard(@Payload() stockControlCardId: number) {
    const res = await this.stockControlCardService
      .getById(stockControlCardId)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('scc/edit')
  async editStockControlCard(
    @Body() updateStockControlCardDTO: IEditStockControlCardDTO,
  ) {
    const res = await this.stockControlCardService
      .update(updateStockControlCardDTO)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('scc/delete')
  async deleteStockControlCard(@Payload() stockControlCardId: number) {
    const res = await this.stockControlCardService
      .remove(stockControlCardId)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }
}
