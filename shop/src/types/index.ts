import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authenticationRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface GetParams {
  slug: string;
  language?: string;
}

export type LayoutProps = {
  readonly children: ReactNode;
};

export interface HomePageProps {
  variables: {
    products: any;
    popularProducts?: any;
    categories: any;
    types: any;
  };
  layout: string;
}

export interface SearchParamOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
  rating: string;
  question: string;
}

export interface QueryOptions {
  language: string;
  page?: number;
  limit?: number;
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Attachment {
  id: number;
  original: string;
  thumbnail: string;
  __typename?: string;
  slug?: string;
}

export interface ProductQueryOptions extends QueryOptions {
  shop_id: string;
  sortedBy: string;
  orderBy: string;
  name: string;
  categories: string;
  tags: string;
  type: string;
  manufacturer: string;
  author: string;
  price: string;
  min_price: string;
  max_price: string;
  language: string;
  searchType: string;
  searchQuery: string;
  text: string;
}

export interface PopularProductQueryOptions extends QueryOptions {
  language: string;
  type_slug: string;
  with: string;
  range: number;
}

export interface CategoryQueryOptions extends QueryOptions {
  language: string;
  parent: string | null;
  type: string;
}

export interface TagQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TypeQueryOptions extends QueryOptions {
  language: string;
  name: string;
  orderBy: any;
}

export interface ShopQueryOptions extends QueryOptions {
  name: string;
  is_active: number;
}

export interface AuthorQueryOptions extends QueryOptions {
  language: string;
  name: string;
  orderBy: string;
}

export interface ManufacturerQueryOptions extends QueryOptions {
  name?: string;
  orderBy?: string;
  language: any;
}

export interface CouponQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface OrderQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ReviewQueryOptions extends QueryOptions {
  product_id: string;
  rating?: string;
  orderBy?: string;
  sortedBy?: string;
}

export interface QuestionQueryOptions extends QueryOptions {
  product_id: string;
  question?: string;
}

export interface MyQuestionQueryOptions extends QueryOptions {}

export interface MyReportsQueryOptions extends QueryOptions {
  language: any;
}

export interface SettingsQueryOptions extends QueryOptions {}

export interface WishlistQueryOptions extends QueryOptions {}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  author: Author;
  manufacturer: Manufacturer;
  tags: Tag[];
  is_digital: boolean;
  product_type: string;
  description: string;
  type: Type;
  price: number;
  sale_price: number;
  min_price: number;
  max_price: number;
  image: Attachment;
  gallery: Attachment[];
  shop: Shop;
  unit: string;
  categories: Category[];
  quantity: number;
  total_reviews: number;
  ratings: number;
  in_wishlist: boolean;
  variations: object[];
  variation_options: object[];
  rating_count: RatingCount[];
  related_products: Product[];
  created_at: string;
  updated_at: string;
  language: string;
}

export interface RatingCount {
  rating: number;
  total: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Attachment;
  parent_id?: number | null;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: Attachment;
}

export interface Type {
  id: string;
  name: string;
  slug?: any;
  banners: Banner[];
  icon?: string;
  promotional_sliders: Attachment[];
  settings: {
    isHome: boolean;
    layoutType: string;
    productCard?: string;
  };
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
}

export enum CouponType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}
export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  name: string;
  slug: string;
  options: {
    [key: string]: any;
  };
}

export interface SetupIntentInfo {
  client_secret?: string;
  intent_id?: string;
}

export interface PaymentIntentInfo {
  client_secret: string;
  payment_id: string;
  is_redirect: boolean;
  redirect_url: string;
  currency: string;
  amount: string;
}

export interface Card {
  expires: string;
  network: string;
  origin: string;
  owner_name: string;
  payment_gateway_id: number | string;
  default_card: number;
}

export interface PaymentIntent {
  id: number | string;
  order_id: number | string;
  payment_gateway: PaymentGateway;
  tracking_number: string;
  payment_intent_info: PaymentIntentInfo;
}

export interface Order {
  id: number | string;
  tracking_number: string;
  customer_id: number | string;
  customer_name: string;
  customer_contact: string;
  customer?: User;
  amount: number;
  children: Order[];
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time?: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
  billing_address?: Address;
  shipping_address?: Address;
  refund: Refund;
  language?: string;
  payment_intent?: PaymentIntent;
  order_status: string;
  payment_status: string;
}

export interface VerifyCouponInputType {
  code: string;
  sub_total: number;
}

export interface VerifyCouponResponse {
  is_valid: boolean;
  coupon?: Coupon;
  message?: string;
}

export interface CreateReviewInput {
  product_id: string;
  shop_id: string;
  order_id: string;
  variation_option_id: string;
  comment?: string;
  rating: number;
  photos?: Attachment[];
}

export interface UpdateReviewInput extends CreateReviewInput {
  id: string;
}

export interface ReviewResponse {
  product_id: string;
}

export interface CreateRefundInput {
  order_id: string;
  title: string;
  description: string;
  images: Attachment[];
}

export interface CreateOrderPaymentInput {
  tracking_number: string;
}

export interface CreateFeedbackInput {
  model_id: string;
  model_type: string;
  positive?: boolean;
  negative?: boolean;
}

export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}

export interface CreateAbuseReportInput {
  model_id: string;
  model_type: string;
  message: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}

export interface Refund {
  id: string;
  title: string;
  description: string;
  images: Attachment[];
  amount: number;
  status: RefundStatus;
  shop: Shop;
  order: Order;
  customer: User;
  created_at: string;
  updated_at: string;
}

export enum PaymentGateway {
  STRIPE = 'STRIPE',
  COD = 'CASH_ON_DELIVERY',
  CASH = 'CASH',
  FULL_WALLET_PAYMENT = 'FULL_WALLET_PAYMENT',
  PAYPAL = 'PAYPAL',
  MOLLIE = 'MOLLIE',
  RAZORPAY = 'RAZORPAY',
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
  COD = 'cash-on-delivery',
  AWAITING_FOR_APPROVAL = 'payment-awaiting-for-approval',
}

enum RefundStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  PROCESSING = 'Processing',
}

export interface Address {
  id: string;
  title: string;
  type: any;
  address: {
    __typename?: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  wallet: {
    total_points: number;
    points_used: number;
    available_points: number;
  };
  profile: {
    id?: string;
    contact?: string;
    bio?: string;
    avatar?: Attachment;
  };
  address: Address[];
  payment_gateways?: UserPaymentGateway[];
}

export interface UserPaymentGateway {
  id: number | string;
  customer_id: string;
  gateway_name: PaymentGateway;
  user_id: number | string;
}

export interface UpdateUserInput extends Partial<User> {
  id: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export type SocialLoginInputType = {
  provider: string;
  access_token: string;
};
export type SendOtpCodeInputType = {
  phone_number: string;
};

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordUserInput {
  email: string;
}

export interface ResetPasswordUserInput {
  email: string;
  token: string;
  password: string;
}

export interface VerifyForgotPasswordUserInput {
  token: string;
  email: string;
}

export interface ChangePasswordUserInput {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  token: string;
  permissions: string[];
}

export interface OTPResponse {
  message: string;
  success: boolean;
  provider: string;
  id: string;
  phone_number: string;
  is_contact_exist: boolean;
}

export interface VerifyOtpInputType {
  phone_number: string;
  code: string;
  otp_id: string;
}

export interface OtpLoginInputType {
  phone_number: string;
  code: string;
  otp_id: string;
  name?: string;
  email?: string;
}

export interface OTPVerifyResponse {
  success: string;
  message: string;
}

export interface DigitalFile {
  id: string;
  fileable: Product;
}

export interface DownloadableFile {
  id: string;
  purchase_key: string;
  digital_file_id: string;
  customer_id: string;
  file: DigitalFile;
  created_at: string;
  updated_at: string;
}

export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface CardInput {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email?: string;
}

// enum PaymentGatewayType {
//   STRIPE = 'Stripe',
//   CASH_ON_DELIVERY = 'Cash on delivery',
//   CASH = 'Cash',
//   FULL_WALLET_PAYMENT = 'Full wallet payment',
// }

export interface CreateOrderInput {
  customer_contact: string;
  customer_name?: string;
  status: string;
  products: ConnectProductOrderPivot[];
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway: PaymentGateway;
  coupon_id?: string;
  shop_id?: string;
  customer_id?: string;
  discount?: number;
  use_wallet_points?: boolean;
  delivery_fee?: number;
  delivery_time: string;
  card: CardInput;
  token?: string;
  billing_address: Address;
  shipping_address: Address;
  language?: string;
}

export interface PaymentIntentCollection {
  tracking_number?: string;
  payment_intent_info?: PaymentIntentInfo;
  payment_gateway?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: Attachment[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Reports {
  id: string;
  message: string;
  created_at: string;
}

export interface ConnectProductOrderPivot {
  product_id: number;
  variation_option_id?: number;
  order_quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface CheckoutVerificationInput {
  amount: number;
  products: ConnectProductOrderPivot[];
  billing_address?: Address;
  shipping_address?: Address;
}

export interface VerifiedCheckoutData {
  total_tax: number;
  shipping_charge: number;
  unavailable_products?: number[];
  wallet_currency?: number;
  wallet_amount?: number;
}

export interface Wishlist {
  id: string;
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}

export interface UserAddress {
  street_address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  billing_address?: Address;
  shipping_address?: Address;
}

export interface ProductPaginator extends PaginatorInfo<Product> {}

export interface CategoryPaginator extends PaginatorInfo<Category> {}

export interface ShopPaginator extends PaginatorInfo<Shop> {}

export interface AuthorPaginator extends PaginatorInfo<Author> {}

export interface ManufacturerPaginator extends PaginatorInfo<Manufacturer> {}

export interface CouponPaginator extends PaginatorInfo<Coupon> {}

export interface TagPaginator extends PaginatorInfo<Tag> {}

export interface OrderPaginator extends PaginatorInfo<Order> {}

export interface OrderStatusPaginator extends PaginatorInfo<OrderStatus> {}

export interface RefundPaginator extends PaginatorInfo<Refund> {}

export interface ReviewPaginator extends PaginatorInfo<Review> {}

export interface QuestionPaginator extends PaginatorInfo<Question> {}

export interface ReportsPaginator extends PaginatorInfo<Question> {}

export interface DownloadableFilePaginator
  extends PaginatorInfo<DownloadableFile> {}

export interface WishlistPaginator extends PaginatorInfo<Wishlist> {}
