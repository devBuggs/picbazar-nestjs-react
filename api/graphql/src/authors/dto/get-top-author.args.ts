import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetTopAuthorArgs {
  @Field(() => Int)
  limit?: number;
  language?: string;
}
