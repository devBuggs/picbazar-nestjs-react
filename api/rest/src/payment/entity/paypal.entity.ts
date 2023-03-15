export class PaypalOrderResponse {
  id: string;
  status: string;
  payment_source: PaymentSource;
  links: Link[];
}

export class PaymentSource {
  paypal: any | Paypal;
}

export class Link {
  href: string;
  rel: string;
  method: string;
}

export class AccessToken {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export class PaypalCaptureOrderResponse {
  id: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  links: Link2[];
}

export class Paypal {
  email_address: string;
  account_id: string;
  name: Name;
  address: Address;
}

export class Name {
  given_name: string;
  surname: string;
}

export class Address {
  country_code: string;
}

export class PurchaseUnit {
  reference_id: string;
  shipping: Shipping;
  payments: Payments;
}

export class Shipping {
  name: Name2;
  address: Address2;
}

export class Name2 {
  full_name: string;
}

export class Address2 {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export class Payments {
  captures: Capture[];
}

export class Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Link[];
  create_time: string;
  update_time: string;
}

export class Amount {
  currency_code: string;
  value: string;
}

export class SellerProtection {
  status: string;
  dispute_categories: string[];
}

export class SellerReceivableBreakdown {
  gross_amount: GrossAmount;
  paypal_fee: PaypalFee;
  net_amount: NetAmount;
}

export class GrossAmount {
  currency_code: string;
  value: string;
}

export class PaypalFee {
  currency_code: string;
  value: string;
}

export class NetAmount {
  currency_code: string;
  value: string;
}

export class Payer {
  name: Name3;
  email_address: string;
  payer_id: string;
  address: Address3;
}

export class Name3 {
  given_name: string;
  surname: string;
}

export class Address3 {
  country_code: string;
}

export class Link2 {
  href: string;
  rel: string;
  method: string;
}
