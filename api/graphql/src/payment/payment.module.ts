import {Module} from '@nestjs/common';
import {StripePaymentService} from "./stripe-payment.service";
import {PaypalPaymentService} from "./paypal-payment.service";

@Module({
    providers: [StripePaymentService, PaypalPaymentService],
    exports: [StripePaymentService, PaypalPaymentService]
})
export class PaymentModule {
}
