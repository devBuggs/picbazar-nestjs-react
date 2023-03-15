import { UserAddress } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { PaymentIntent } from 'src/payment-intent/entries/payment-intent.entity';
import { File, Product } from 'src/products/entities/product.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from './order-status.entity';

export enum PaymentGatewayType {
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CASH = 'CASH',
  FULL_WALLET_PAYMENT = 'FULL_WALLET_PAYMENT',
  PAYPAL = 'PAYPAL',
  RAZORPAY = 'RAZORPAY',
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
  DEFAULT_ORDER_STATUS = 'order-pending',
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
  DEFAULT_PAYMENT_STATUS = 'payment-pending',
}

export class Order extends CoreEntity {
  tracking_number: string;
  customer_id: number;
  customer_contact: string;
  customer: User;
  parent_order?: Order;
  children: Order[];
  status: OrderStatus;
  order_status: OrderStatusType;
  payment_status: PaymentStatusType;
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway: PaymentGatewayType;
  coupon?: Coupon;
  shop: Shop;
  discount?: number;
  delivery_fee: number;
  delivery_time: string;
  products: Product[];
  billing_address: UserAddress;
  shipping_address: UserAddress;
  language: string;
  translated_languages: string[];
  payment_intent: PaymentIntent;
}

export class OrderFiles extends CoreEntity {
  purchase_key: string;
  digital_file_id: number;
  order_id?: number;
  customer_id: number;
  file: File;
  fileable: Product;
}
