import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { PaymentIntent } from 'src/payment-intent/entities/payment-intent.entity';
import {
  CheckoutVerificationInput,
  VerifiedCheckoutData,
} from './dto/verify-checkout.input';
import ordersJson from './orders.json';
import orderStatusJson from './order-statuses.json';
import orderFilesJson from './order-files.json';
import orderExportJson from './order-export.json';
import orderInvoiceJson from './order-invoice.json';
import { paginate } from 'src/common/pagination/paginate';
import { plainToClass } from 'class-transformer';
import {
  Order,
  OrderFiles,
  OrderStatusType,
  PaymentGatewayType,
  PaymentStatusType,
} from './entities/order.entity';
import { GetOrdersArgs, OrderPaginator } from './dto/get-orders.args';
import { GetOrderArgs } from './dto/get-order.args';
import {
  GetOrderStatusesArgs,
  OrderStatusPaginator,
} from './dto/get-order-statuses.args';
import { OrderStatus } from './entities/order-status.entity';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from './dto/create-order-status.input';
import { GetOrderFilesPaginator } from './dto/get-order-file.args';
import { GenerateDownloadableUrlInput } from './dto/generate-downloadable-url.input';
import { GenerateOrderExportUrlInput } from './dto/generate-order-export-url.input';
import { GetOrderStatusArgs } from './dto/get-order-status.args';
import { GenerateInvoiceDownloadUrlInput } from './dto/generate-download-invoice-url.input';
import { UsersService } from 'src/users/users.service';
import { StripePaymentService } from 'src/payment/stripe-payment.service';
import { PaypalPaymentService } from 'src/payment/paypal-payment.service';
import { Setting } from 'src/settings/entities/setting.entity';
import settingJson from 'src/settings/settings.json';
import paymentIntentJson from 'src/payment-intent/payment-intent.json';
import paymentGatewayJson from 'src/payment-method/payment-gateway.json';
import { PaymentGateWay } from '../payment-method/entities/payment-gateway.entity';
import * as process from 'process';

const orders = plainToClass(Order, ordersJson);
const orderStatus = plainToClass(OrderStatus, orderStatusJson);
const orderFiles = plainToClass(OrderFiles, orderFilesJson);
const settings = plainToClass(Setting, settingJson);
const paymentIntents = plainToClass(PaymentIntent, paymentIntentJson);
const paymentGateways = plainToClass(PaymentGateWay, paymentGatewayJson);

@Injectable()
export class OrdersService {
  private orders: Order[] = orders;
  private orderStatus: OrderStatus[] = orderStatus;
  private orderFiles: OrderFiles[] = orderFiles;
  private setting: Setting = settings;

  constructor(
    private readonly authService: UsersService,
    private readonly stripeService: StripePaymentService,
    private readonly paypalService: PaypalPaymentService,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const paymentGatewayArr = [
      PaymentGatewayType.STRIPE,
      PaymentGatewayType.PAYPAL,
      PaymentGatewayType.RAZORPAY,
    ];
    this.orders[0]['order_status'] = OrderStatusType.PENDING;
    this.orders[0]['payment_status'] = PaymentStatusType.PENDING;
    this.orders[0]['payment_gateway'] = createOrderInput.payment_gateway;
    const order = this.orders[0];
    try {
      if (paymentGatewayArr.includes(createOrderInput.payment_gateway)) {
        const paymentIntent = await this.processPaymentIntent(
          order,
          this.setting,
        );
        this.orders[0].order_status = OrderStatusType.PENDING.toString();
        this.orders[0].payment_status = PaymentStatusType.PENDING.toString();
        this.orders[0].payment_intent = paymentIntent;
      }
      return this.orders[0];
    } catch (error) {
      return this.orders[0];
    }
  }

  getOrders({
    first,
    page,
    customer_id,
    tracking_number,
    shop_id,
  }: GetOrdersArgs): OrderPaginator {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Order[] = this.orders;

    if (shop_id) {
      data = this.orders?.filter((p) => p?.shop?.id === Number(shop_id));
    }

    if (tracking_number?.replace(/%/g, '')) {
      const formatTrackingNumber = tracking_number?.replace(/%/g, '');
      data = this.orders?.filter(
        (p) => p.tracking_number === formatTrackingNumber,
      );
    }

    const results = data.slice(startIndex, endIndex);

    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  getOrder({ id, tracking_number }: GetOrderArgs): Order {
    let parentOrder = undefined;
    if (id) {
      parentOrder = this.orders.find((p) => p.id === Number(id));
    } else {
      parentOrder = this.orders.find(
        (p) => p.tracking_number === tracking_number,
      );
    }
    if (!parentOrder) {
      return this.orders[0];
    }
    return parentOrder;
  }

  getOrderStatuses({
    first,
    page,
    text,
    orderBy,
  }: GetOrderStatusesArgs): OrderStatusPaginator {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    const data: OrderStatus[] = this.orderStatus;

    // if (shop_id) {
    //   data = this.orders?.filter((p) => p?.shop?.id === shop_id);
    // }
    const results = data.slice(startIndex, endIndex);

    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  getOrderStatus({ slug }: GetOrderStatusArgs) {
    return this.orderStatus.find((p) => p.slug === slug);
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return this.orders[0];
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async getOrderByIdOrTrackingNumber(id: number): Promise<Order> {
    try {
      return (
        this.orders.find(
          (o: Order) => o.id === Number(id) || Number(o.tracking_number) === id,
        ) ?? this.orders[0]
      );
    } catch (error) {
      console.log(error);
    }
  }

  verifyCheckout(input: CheckoutVerificationInput): VerifiedCheckoutData {
    return {
      total_tax: 0,
      shipping_charge: 0,
      unavailable_products: [],
      wallet_amount: 0,
      wallet_currency: 0,
    };
  }

  createOrderStatus(createOrderStatusInput: CreateOrderStatusInput) {
    return this.orderStatus[0];
  }

  updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusInput) {
    return this.orderStatus[0];
  }

  async getOrderFileItems({ first, page }: GetOrderFilesPaginator) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    const data: OrderFiles[] = this.orderFiles;

    const results = data.slice(startIndex, endIndex);

    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  async getDigitalFileDownloadUrl({
    digital_file_id,
  }: GenerateDownloadableUrlInput) {
    const item: OrderFiles = this.orderFiles.find(
      (singleItem) => singleItem.digital_file_id === Number(digital_file_id),
    );

    return item.file.url;
  }

  async generateOrderExportUrl({ shop_id }: GenerateOrderExportUrlInput) {
    return orderExportJson.url;
  }

  async generateInvoiceDownloadUrl({
    order_id,
  }: GenerateInvoiceDownloadUrlInput) {
    return orderInvoiceJson[0].url;
  }

  /**
   * helper methods from here
   */

  /**
   * This action will return Payment Intent
   * @param order
   * @param setting
   */
  async processPaymentIntent(
    order: Order,
    setting: Setting,
  ): Promise<PaymentIntent> {
    const paymentIntent = paymentIntents.find(
      (intent: PaymentIntent) =>
        intent.tracking_number === order.tracking_number &&
        intent.payment_gateway.toString().toLowerCase() ===
          setting.options.paymentGateway.toString().toLowerCase(),
    );
    if (paymentIntent) {
      return paymentIntent;
    }
    const {
      id: payment_id,
      client_secret = null,
      redirect_url = null,
      customer = null,
    } = await this.savePaymentIntent(order, setting.options.paymentGateway);
    const is_redirect = redirect_url ? true : false;
    const paymentIntentInfo: PaymentIntent = {
      id: Number(Date.now()),
      order_id: order.id,
      tracking_number: order.tracking_number,
      payment_gateway: order.payment_gateway.toString().toLowerCase(),
      payment_intent_info: {
        client_secret,
        payment_id,
        redirect_url,
        is_redirect,
        currency: process.env.DEFAULT_CURRENCY || 'USD',
        amount: order.paid_total.toString(),
      },
    };

    // paymentIntents.push(paymentIntentInfo);
    // const paymentGateway: PaymentGateWay = {
    //   id: Number(Date.now()),
    //   user_id: this.authService.me().id,
    //   customer_id: customer,
    //   gateway_name: setting.options.paymentGateway,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // };
    // paymentGateways.push(paymentGateway);
    return paymentIntentInfo;
  }

  /**
   * Trail method of ProcessPaymentIntent Method
   * @param order
   * @param paymentGateway
   */
  async savePaymentIntent(order: Order, paymentGateway?: string): Promise<any> {
    const me = this.authService.me();
    switch (order.payment_gateway) {
      case PaymentGatewayType.STRIPE:
        const paymentIntentParam =
          await this.stripeService.makePaymentIntentParam(order, me);
        return await this.stripeService.createPaymentIntent(paymentIntentParam);
      case PaymentGatewayType.PAYPAL:
        // here goes PayPal
        return this.paypalService.createPaymentIntent(order);
        break;

      default:
        //
        break;
    }
  }

  /**
   *  Route {order/payment} Submit Payment intent here
   * @param order
   * @param orderPaymentDto
   */
  async stripePay(order: Order) {
    this.orders[0]['order_status'] = OrderStatusType.PROCESSING.toString();
    this.orders[0]['payment_status'] = PaymentStatusType.SUCCESS.toString();
    this.orders[0]['payment_intent'] = null;
  }

  async paypal(order: Order) {
    this.orders[0]['order_status'] = OrderStatusType.PROCESSING.toString();
    this.orders[0]['payment_status'] = PaymentStatusType.SUCCESS.toString();
    const { status } = await this.paypalService.verifyOrder(
      order.payment_intent.payment_intent_info.payment_id,
    );
    this.orders[0]['payment_intent'] = null;
    if (status === 'COMPLETED') {
      console.log('payment Success');
    }
  }

  changeOrderPaymentStatus(
    orderStatus: OrderStatusType,
    paymentStatus: PaymentStatusType,
  ) {
    this.orders[0]['order_status'] = orderStatus;
    this.orders[0]['payment_status'] = paymentStatus;
  }
}
