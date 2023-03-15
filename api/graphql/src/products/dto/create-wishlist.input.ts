import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWishlistInput {
  @Field(() => ID)
  product_id: number;
}
