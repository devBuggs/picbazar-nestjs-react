import { Test, TestingModule } from '@nestjs/testing';
import { PosProductsService } from './pos-products.service';

describe('PosProductsService', () => {
  let service: PosProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PosProductsService],
    }).compile();

    service = module.get<PosProductsService>(PosProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
