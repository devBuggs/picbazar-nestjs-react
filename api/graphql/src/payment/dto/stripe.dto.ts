export class StripeCreateCustomerDto {
  address?: Address;
  description?: string;
  name?: string;
  email?: string;
}
export class Address {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
}

export class CardElementDto {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}

export class CreatePaymentIntentDto {
  amount: number;
  currency: string;
}
