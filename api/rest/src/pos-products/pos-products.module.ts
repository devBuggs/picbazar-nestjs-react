import { Module } from '@nestjs/common';
import { PosProductsService } from './pos-products.service';
import { PosProductsController } from './pos-products.controller';
import { PosProducts, PosProductsSchema } from './schema/pos-products.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PosProducts.name,
        schema: PosProductsSchema
      }
    ])
  ],
  controllers: [PosProductsController],
  providers: [PosProductsService]
})
export class PosProductsModule {}
