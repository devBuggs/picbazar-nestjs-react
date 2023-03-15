import {ArgsType} from '@nestjs/graphql';

@ArgsType()
export class GetPaymentMethodsArgs {
  text?: string;
}
