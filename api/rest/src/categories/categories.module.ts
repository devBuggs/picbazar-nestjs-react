import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schema/categories.schema';
import { Products, ProductsSchema } from 'src/products/schema/products.schema';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categories.name,
        schema: CategoriesSchema
      },
      {
        name: Products.name,
        schema: ProductsSchema
      }
    ])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, ProductsService],
})
export class CategoriesModule {}
