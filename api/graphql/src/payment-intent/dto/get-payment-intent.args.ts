import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetPaymentIntentArgs {
  tracking_number?: string;
}
