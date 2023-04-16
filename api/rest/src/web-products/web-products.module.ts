import { Module } from '@nestjs/common';
import { WebProductsService } from './web-products.service';
import { ProductsService } from 'src/products/products.service';
import { WebProductsController } from './web-products.controller';
import { WebProducts, WebProductsSchema } from './schema/web-product.schema';
import { Products, ProductsSchema } from 'src/products/schema/products.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WebProducts.name,
        schema: WebProductsSchema
      },
      {
        name: Products.name,
        schema: ProductsSchema
      }
    ])
  ],
  controllers: [WebProductsController],
  providers: [WebProductsService, ProductsService]
})
export class WebProductsModule {}
