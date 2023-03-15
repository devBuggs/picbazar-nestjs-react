import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateReviewInput } from './create-review.input';

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => ID)
  id?: number;
}
