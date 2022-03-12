import { Test, TestingModule } from '@nestjs/testing';
import { StockcontrolcardService } from './stockcontrolcard.service';

describe('StockcontrolcardService', () => {
  let service: StockcontrolcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockcontrolcardService],
    }).compile();

    service = module.get<StockcontrolcardService>(StockcontrolcardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
