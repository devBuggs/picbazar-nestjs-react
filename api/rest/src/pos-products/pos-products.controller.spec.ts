import { Test, TestingModule } from '@nestjs/testing';
import { PosProductsController } from './pos-products.controller';
import { PosProductsService } from './pos-products.service';

describe('PosProductsController', () => {
  let controller: PosProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosProductsController],
      providers: [PosProductsService],
    }).compile();

    controller = module.get<PosProductsController>(PosProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
