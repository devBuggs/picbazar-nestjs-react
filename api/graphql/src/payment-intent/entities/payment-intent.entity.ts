import { CoreEntity } from 'src/common/entities/core.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PaymentIntentType', { isAbstract: true })
@ObjectType()
export class PaymentIntent {
  @Field(() => ID)
  id: number;
  @Field(() => ID)
  order_id: number;
  @Field(() => ID)
  tracking_number: string;
  payment_gateway: string;
  payment_intent_info?: PaymentIntentInfo;
}
@InputType('PaymentIntentInfoType', { isAbstract: true })
@ObjectType()
export class PaymentIntentInfo {
  client_secret?: string | null;
  redirect_url?: string | null;
  payment_id: string;
  is_redirect: boolean;
  currency: string;
  amount: string;
}
