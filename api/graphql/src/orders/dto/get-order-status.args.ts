import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetOrderStatusArgs {
  slug?: string;
  language?: string;
}
