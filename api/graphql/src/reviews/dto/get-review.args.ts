import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetReviewArgs {
  @Field(() => ID)
  id?: number;
}
