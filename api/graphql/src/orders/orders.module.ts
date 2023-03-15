import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  GenerateExportUrlResolver,
  GenerateInvoiceDownloadResolver,
  OrderFileResolver,
  OrdersResolver,
} from './orders.resolver';
import {PaymentModule} from 'src/payment/payment.module';
import {AuthorsModule} from 'src/authors/authors.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PaymentModule, UsersModule],
  providers: [
    OrdersResolver,
    OrdersService,
    OrderFileResolver,
    GenerateExportUrlResolver,
    GenerateInvoiceDownloadResolver,
  ],
})
export class OrdersModule {}
