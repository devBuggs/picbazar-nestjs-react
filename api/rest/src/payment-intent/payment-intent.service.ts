import taxesJson from '@db/taxes.json';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PaymentIntent } from './entries/payment-intent.entity';

const paymentIntents = plainToClass(PaymentIntent, taxesJson);

@Injectable()
export class PaymentIntentService {
  private paymentIntents: PaymentIntent[] = paymentIntents;
  getPaymentIntent() {
    return `this action is returning payment intent`;
  }
}
