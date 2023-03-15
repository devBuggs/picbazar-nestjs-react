import { Module } from '@nestjs/common';
import { PaymentIntentService } from './payment-intent.service';
import { PaymentIntentResolver } from './payment-intent.resolver';

@Module({
  providers: [PaymentIntentService, PaymentIntentResolver]
})
export class PaymentIntentModule {}
