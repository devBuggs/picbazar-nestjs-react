import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetTopManufacturerArgs {
  @Field(() => Int)
  limit?: number;
  language?: string;
}
