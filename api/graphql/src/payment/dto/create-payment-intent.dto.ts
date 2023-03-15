export class PaypalCreateIntentPram {
  intent: string;
  purchase_units: PurchaseUnit[];
  payment_source: PaymentSource;
}

export class PurchaseUnit {
  invoice_id: number;
  amount: Amount;
  description: string;
}

export class Amount {
  currency_code: string;
  value: number;
}

export class PaymentSource {
  paypal: Paypal;
}

export class Paypal {
  experience_context: ExperienceContext;
}

export class ExperienceContext {
  user_action: string;
  payment_method_preference: string;
  cancel_url: string;
  return_url: string;
}
