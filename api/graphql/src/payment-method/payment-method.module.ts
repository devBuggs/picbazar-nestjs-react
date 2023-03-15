import {Module} from '@nestjs/common';
import {PaymentMethodService} from './payment-method.service';
import {PaymentMethodResolver} from './payment-method.resolver';
import {PaymentModule} from "src/payment/payment.module";
import {UsersModule} from "../users/users.module";
import {SettingsModule} from "../settings/settings.module";

@Module({
    imports: [PaymentModule, UsersModule, SettingsModule],
    providers: [PaymentMethodService, PaymentMethodResolver]
})
export class PaymentMethodModule {
}
