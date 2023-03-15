import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
