import { Test, TestingModule } from '@nestjs/testing';
import { StockcontrolcardController } from './stockcontrolcard.controller';
import { StockcontrolcardService } from './stockcontrolcard.service';

describe('StockcontrolcardController', () => {
  let controller: StockcontrolcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockcontrolcardController],
      providers: [StockcontrolcardService],
    }).compile();

    controller = module.get<StockcontrolcardController>(StockcontrolcardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
