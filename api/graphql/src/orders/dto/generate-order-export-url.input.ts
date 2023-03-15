import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GenerateOrderExportUrlInput {
  @Field(() => ID)
  shop_id?: string;
}
