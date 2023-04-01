import { Test, TestingModule } from '@nestjs/testing';
import { WebProductsService } from './web-products.service';

describe('WebProductsService', () => {
  let service: WebProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebProductsService],
    }).compile();

    service = module.get<WebProductsService>(WebProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
