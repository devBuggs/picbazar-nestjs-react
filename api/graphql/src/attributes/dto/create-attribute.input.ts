import { InputType, Field, PickType, ID } from '@nestjs/graphql';
import { Attribute } from '../entities/attribute.entity';

@InputType()
export class CreateAttributeInput extends PickType(Attribute, [
  'name',
  'shop_id',
  'language',
]) {
  values: AttributeValueInput[];
}

@InputType()
export class AttributeValueInput {
  @Field(() => ID)
  id?: number;
  value: string;
  meta?: string;
  language?: string;
}
