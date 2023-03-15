import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { Product } from './product.entity';

@InputType('VariationDigitalFileInputType', { isAbstract: true })
@ObjectType()
export class VariationDigitalFile extends CoreEntity {
  @Field(() => Int)
  attachment_id: number;
  url: string;
}

@InputType('VariationInputType', { isAbstract: true })
@ObjectType()
export class Variation {
  @Field(() => ID)
  id: number;
  title: string;
  product?: Product;
  @Field(() => Float)
  price: number;
  image?: Attachment;
  sku: string;
  is_disable: boolean;
  is_digital: boolean;
  @Field(() => Float)
  sale_price?: number;
  @Field(() => Int)
  quantity: number;
  options: VariationOption[];
  digital_file?: VariationDigitalFile;
}

@InputType()
export class VariationInput extends Variation {}

@InputType('VariationOptionInputType', { isAbstract: true })
@ObjectType()
export class VariationOption {
  name: string;
  value: string;
}
