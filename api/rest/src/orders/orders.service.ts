import exportOrderJson from '@db/order-export.json';
import orderFilesJson from '@db/order-files.json';
import orderInvoiceJson from '@db/order-invoice.json';
import orderStatusJson from '@db/order-statuses.json';
import ordersJson from '@db/orders.json';
import paymentGatewayJson from '@db/payment-gateway.json';
import paymentIntentJson from '@db/payment-intent.json';
import setting from '@db/settings.json';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { AuthService } from 'src/auth/auth.service';
import { paginate } from 'src/common/pagination/paginate';
import { PaymentIntent } from 'src/payment-intent/entries/payment-intent.entity';
import { PaymentGateWay } from 'src/payment-method/entities/payment-gateway.entity';
import { PaypalPaymentService } from 'src/payment/paypal-payment.service';
import { StripePaymentService } from 'src/payment/stripe-payment.service';
import { Setting } from 'src/settings/entities/setting.entity';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderFilesDto } from './dto/get-downloads.dto';
import {
  GetOrderStatusesDto,
  OrderStatusPaginator,
} from './dto/get-order-statuses.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  CheckoutVerificationDto,
  VerifiedCheckoutData,
} from './dto/verify-checkout.dto';
import { OrderStatus } from './entities/order-status.entity';
import {
  Order,
  OrderFiles,
  OrderStatusType,
  PaymentGatewayType,
  PaymentStatusType,
} from './entities/order.entity';

const orders = plainToClass(Order, ordersJson);
const paymentIntents = plainToClass(PaymentIntent, paymentIntentJson);
const paymentGateways = plainToClass(PaymentGateWay, paymentGatewayJson);
const orderStatus = plainToClass(OrderStatus, orderStatusJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(orderStatus, options);

const orderFiles = plainToClass(OrderFiles, orderFilesJson);
const settings = plainToClass(Setting, setting);

@Injectable()
export class OrdersService {
  private orders: Order[] = orders;
  private orderStatus: OrderStatus[] = orderStatus;
  private orderFiles: OrderFiles[] = orderFiles;
  private setting: Setting = settings;

  constructor(
    private readonly authService: AuthService,
    private readonly stripeService: StripePaymentService,
    private readonly paypalService: PaypalPaymentService,
  ) {}
  async create(createOrderInput: CreateOrderDto): Promise<Order> {
    const order: Order = this.orders[0];
    const payment_gateway_type = createOrderInput.payment_gateway
      ? createOrderInput.payment_gateway
      : PaymentGatewayType.CASH_ON_DELIVERY;
    order.payment_gateway = payment_gateway_type;
    order.payment_intent = null;
    // set the order type and payment type

    switch (payment_gateway_type) {
      case PaymentGatewayType.CASH_ON_DELIVERY:
        order.order_status = OrderStatusType.PROCESSING;
        order.payment_status = PaymentStatusType.CASH_ON_DELIVERY;
        break;
      case PaymentGatewayType.CASH:
        order.order_status = OrderStatusType.PROCESSING;
        order.payment_status = PaymentStatusType.CASH;
        break;
      case PaymentGatewayType.FULL_WALLET_PAYMENT:
        order.order_status = OrderStatusType.COMPLETED;
        order.payment_status = PaymentStatusType.WALLET;
        break;
      default:
        order.order_status = OrderStatusType.PENDING;
        order.payment_status = PaymentStatusType.PENDING;
        break;
    }
    order.children = this.processChildrenOrder(order);
    try {
      if (
        [
          PaymentGatewayType.STRIPE,
          PaymentGatewayType.PAYPAL,
          PaymentGatewayType.RAZORPAY,
        ].includes(payment_gateway_type)
      ) {
        const paymentIntent = await this.processPaymentIntent(
          order,
          this.setting,
        );
        order.payment_intent = paymentIntent;
      }
      return order;
    } catch (error) {
      return order;
    }
  }

  async getOrders({
    limit,
    page,
    customer_id,
    tracking_number,
    search,
    shop_id,
  }: GetOrdersDto): Promise<OrderPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let data: Order[] = this.orders;

    if (shop_id && shop_id !== 'undefined') {
      data = this.orders?.filter((p) => p?.shop?.id === Number(shop_id));
    }
    const results = data.slice(startIndex, endIndex);
    const url = `/orders?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getOrderByIdOrTrackingNumber(id: number): Promise<Order> {
    try {
      return (
        this.orders.find(
          (o: Order) =>
            o.id === Number(id) || o.tracking_number === id.toString(),
        ) ?? this.orders[0]
      );
    } catch (error) {
      console.log(error);
    }
  }

  getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
  }: GetOrderStatusesDto): OrderStatusPaginator {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: OrderStatus[] = this.orderStatus;

    // if (shop_id) {
    //   data = this.orders?.filter((p) => p?.shop?.id === shop_id);
    // }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/order-status?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrderStatus(param: string, language: string) {
    return this.orderStatus.find((p) => p.slug === param);
  }

  update(id: number, updateOrderInput: UpdateOrderDto) {
    return this.orders[0];
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  verifyCheckout(input: CheckoutVerificationDto): VerifiedCheckoutData {
    return {
      total_tax: 0,
      shipping_charge: 0,
      unavailable_products: [],
      wallet_currency: 0,
      wallet_amount: 0,
    };
  }

  createOrderStatus(createOrderStatusInput: CreateOrderStatusDto) {
    return this.orderStatus[0];
  }

  updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusDto) {
    return this.orderStatus[0];
  }

  async getOrderFileItems({ page, limit }: GetOrderFilesDto) {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = orderFiles.slice(startIndex, endIndex);

    const url = `/downloads?&limit=${limit}`;
    return {
      data: results,
      ...paginate(orderFiles.length, page, limit, results.length, url),
    };
  }

  async getDigitalFileDownloadUrl(digitalFileId: number) {
    const item: OrderFiles = this.orderFiles.find(
      (singleItem) => singleItem.digital_file_id === digitalFileId,
    );

    return item.file.url;
  }

  async exportOrder(shop_id: string) {
    return exportOrderJson.url;
  }

  async downloadInvoiceUrl(shop_id: string) {
    return orderInvoiceJson[0].url;
  }

  /**
   * helper methods from here
   */

  /**
   * this method will process children of Order Object
   * @param order
   * @returns Children[]
   */
  processChildrenOrder(order: Order) {
    return [...order.children].map((child) => {
      child.order_status = order.order_status;
      child.payment_status = order.payment_status;
      return child;
    });
  }
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
      },
    };

    /**
     * Commented below code will work for real database.
     * if you uncomment this for json will arise conflict.
     */

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
   * Trailing method of ProcessPaymentIntent Method
   *
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
    this.orders[0]['order_status'] = OrderStatusType.PROCESSING;
    this.orders[0]['payment_status'] = PaymentStatusType.SUCCESS;
    this.orders[0]['payment_intent'] = null;
  }

  async paypalPay(order: Order) {
    this.orders[0]['order_status'] = OrderStatusType.PROCESSING;
    this.orders[0]['payment_status'] = PaymentStatusType.SUCCESS;
    const { status } = await this.paypalService.verifyOrder(
      order.payment_intent.payment_intent_info.payment_id,
    );
    this.orders[0]['payment_intent'] = null;
    if (status === 'COMPLETED') {
      //console.log('payment Success');
    }
  }

  /**
   * This method will set order status and payment status
   * @param orderStatus
   * @param paymentStatus
   */
  changeOrderPaymentStatus(
    orderStatus: OrderStatusType,
    paymentStatus: PaymentStatusType,
  ) {
    this.orders[0]['order_status'] = orderStatus;
    this.orders[0]['payment_status'] = paymentStatus;
  }
}
