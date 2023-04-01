import { Module } from '@nestjs/common';
import { PosProductsService } from './pos-products.service';
import { PosProductsController } from './pos-products.controller';

@Module({
  controllers: [PosProductsController],
  providers: [PosProductsService]
})
export class PosProductsModule {}
