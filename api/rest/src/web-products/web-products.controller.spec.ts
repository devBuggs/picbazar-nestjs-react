import { Test, TestingModule } from '@nestjs/testing';
import { WebProductsController } from './web-products.controller';
import { WebProductsService } from './web-products.service';

describe('WebProductsController', () => {
  let controller: WebProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebProductsController],
      providers: [WebProductsService],
    }).compile();

    controller = module.get<WebProductsController>(WebProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
