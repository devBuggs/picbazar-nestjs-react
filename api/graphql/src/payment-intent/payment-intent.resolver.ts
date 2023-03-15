import {Args, ID, Query, Resolver} from '@nestjs/graphql';
import {PaymentIntent} from './entities/payment-intent.entity';
import {PaymentIntentService} from './payment-intent.service';

@Resolver(() => PaymentIntent)
export class PaymentIntentResolver {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}
  @Query(() => PaymentIntent || null, { name: 'getPaymentIntent' })
  async getPaymentIntent(@Args('tracking_number',{type: () => ID} ) tracking_number): Promise<PaymentIntent> {
    return this.paymentIntentService.findOne(tracking_number);
  }
}
