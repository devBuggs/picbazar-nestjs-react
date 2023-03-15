import paymentIntentJson from './payment-intent.json';
import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {PaymentIntent} from './entities/payment-intent.entity';

const paymentIntents = plainToClass(PaymentIntent, paymentIntentJson);

@Injectable()
export class PaymentIntentService {
  private paymentIntents: PaymentIntent[] = paymentIntents;
  findOne(tracking_number: string): PaymentIntent {
    return this.paymentIntents[0];
  }
}
