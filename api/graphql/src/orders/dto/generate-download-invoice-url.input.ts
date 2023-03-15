import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GenerateInvoiceDownloadUrlInput {
  is_rtl?: boolean;
  language?: string;
  @Field(() => ID)
  order_id: number;
  translated_languages?: InvoiceTranslatedLanguages;
}

@InputType()
export class InvoiceTranslatedLanguages {
  date?: string;
  delivery_fee?: string;
  discount?: string;
  invoice_no?: string;
  products?: string;
  quantity?: string;
  subtotal?: string;
  tax?: string;
  total?: string;
}
