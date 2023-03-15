export enum QueryProductsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  STATUS = 'STATUS',
  UPDATED_AT = 'UPDATED_AT',
  PRICE = 'PRICE',
  SALE_PRICE = 'SALE_PRICE',
  MAX_PRICE = 'MAX_PRICE',
  MIN_PRICE = 'MIN_PRICE',
  QUANTITY = 'QUANTITY',
}

export enum QueryProductsHasCategoriesColumn {
  SLUG = 'SLUG',
}

export enum QueryProductsHasTypeColumn {
  SLUG = 'SLUG',
}

export enum OrderStatus {
  PENDING = 'order-pending',
  PROCESSING = 'order-processing',
  COMPLETED = 'order-completed',
  CANCELLED = 'order-cancelled',
  REFUNDED = 'order-refunded',
  FAILED = 'order-failed',
  AT_LOCAL_FACILITY = 'order-at-local-facility',
  OUT_FOR_DELIVERY = 'order-out-for-delivery',
}

export enum PaymentStatus {
  PENDING = 'payment-pending',
  PROCESSING = 'payment-processing',
  SUCCESS = 'payment-success',
  FAILED = 'payment-failed',
  REVERSAL = 'payment-reversal',
  COD = 'payment-cash-on-delivery',
}

export enum PaymentGateway {
  STRIPE = 'STRIPE',
  COD = 'CASH_ON_DELIVERY',
  CASH = 'CASH',
}

export enum CouponType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}
