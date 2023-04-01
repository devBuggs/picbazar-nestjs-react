import { Module } from '@nestjs/common';
import { WebProductsService } from './web-products.service';
import { WebProductsController } from './web-products.controller';

@Module({
  controllers: [WebProductsController],
  providers: [WebProductsService]
})
export class WebProductsModule {}
