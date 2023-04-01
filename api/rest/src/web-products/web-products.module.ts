import { Module } from '@nestjs/common';
import { WebProductsService } from './web-products.service';
import { WebProductsController } from './web-products.controller';
import { WebProducts, WebProductsSchema } from './schema/web-product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WebProducts.name,
        schema: WebProductsSchema
      }
    ])
  ],
  controllers: [WebProductsController],
  providers: [WebProductsService]
})
export class WebProductsModule {}
