import {
  ObjectType,
  Field,
  registerEnumType,
  InputType,
  ID,
  Int,
} from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserAddress } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { DigitalFile, Product } from 'src/products/entities/product.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from './order-status.entity';
import { PaymentIntent } from 'src/payment-intent/entities/payment-intent.entity';

export enum PaymentGatewayType {
  STRIPE = 'stripe',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CASH = 'Cash',
  FULL_WALLET_PAYMENT = 'Full wallet payment',
  PAYPAL = 'paypal',
  RAZORPAY = 'razorpay',
}
export enum OrderStatusType {
  PENDING = 'order-pending',
  PROCESSING = 'order-processing',
  COMPLETED = 'order-completed',
  CANCELLED = 'order-cancelled',
  REFUNDED = 'order-refunded',
  FAILED = 'order-failed',
  AT_LOCAL_FACILITY = 'order-at-local-facility',
  OUT_FOR_DELIVERY = 'order-out-for-delivery',
}

export enum PaymentStatusType {
  PENDING = 'payment-pending',
  PROCESSING = 'payment-processing',
  SUCCESS = 'payment-success',
  FAILED = 'payment-failed',
  REVERSAL = 'payment-reversal',
  CASH_ON_DELIVERY = 'payment-cash-on-delivery',
  CASH = 'payment-cash',
  WALLET = 'payment-wallet',
  AWAITING_FOR_APPROVAL = 'payment-awaiting-for-approval',
}

registerEnumType(OrderStatusType, { name: 'OrderStatusType' });
registerEnumType(PaymentStatusType, { name: 'PaymentStatusType' });
registerEnumType(PaymentGatewayType, { name: 'PaymentGatewayType' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
export class Order extends CoreEntity {
  tracking_number: string;
  @Field(() => ID)
  customer_id?: number;
  customer_contact: string;
  customer_name?: string;
  customer: User;
  @Type(() => Order)
  parent_order?: Order;
  @Type(() => Order)
  children: Order[];
  @Type(() => PaymentIntent)
  payment_intent?: PaymentIntent;
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  order_status?: string;
  payment_status?: string;
  payment_gateway: PaymentGatewayType;
  coupon?: Coupon;
  shop: Shop;
  discount?: number;
  delivery_fee: number;
  delivery_time?: string;
  @Type(() => Product)
  products: Product[];
  billing_address?: UserAddress;
  shipping_address?: UserAddress;
  refund?: Refund;
  wallet_point?: WalletPoint;
  language: string;
  translated_languages: string[];
}

@InputType('WalletPointInputType', { isAbstract: true })
@ObjectType()
class WalletPoint {
  @Field(() => ID)
  id: number;
  amount: number;
}

@InputType('OrderFileInputType', { isAbstract: true })
@ObjectType()
export class OrderFiles extends CoreEntity {
  purchase_key?: string;
  @Field(() => Int)
  digital_file_id?: number;
  @Field(() => Int)
  customer_id?: number;
  tracking_number?: string;
  @Field(() => Order)
  order?: Order;
  file?: DigitalFile;
}
