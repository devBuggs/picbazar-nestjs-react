import { Module } from '@nestjs/common';
import { PaymentIntentController } from './payment-intent.controller';
import { PaymentIntentService } from './payment-intent.service';

@Module({
  controllers: [PaymentIntentController],
  providers: [PaymentIntentService],
})
export class PaymentIntentModule {}
