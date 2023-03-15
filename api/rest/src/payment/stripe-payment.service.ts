import { Injectable } from '@nestjs/common';
import settingJson from '@db/settings.json';
import { Setting } from 'src/settings/entities/setting.entity';
import { plainToClass } from 'class-transformer';
import { InjectStripe } from 'nestjs-stripe';
import paymentGatewayJson from 'src/db/pickbazar/payment-gateway.json';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentGateWay } from 'src/payment-method/entities/payment-gateway.entity';
import { User } from 'src/users/entities/user.entity';
import Stripe from 'stripe';
import {
  CardElementDto,
  CreatePaymentIntentDto,
  StripeCreateCustomerDto,
} from './dto/stripe.dto';
import {
  StripeCustomer,
  StripeCustomerList,
  StripePaymentIntent,
  StripePaymentMethod,
} from './entity/stripe.entity';

const paymentGateways = plainToClass(PaymentGateWay, paymentGatewayJson);
const setting = plainToClass(Setting, settingJson);
@Injectable()
export class StripePaymentService {
  private paymentGateways: PaymentGateWay[] = paymentGateways;

  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  /**
   * @param  {StripeCreateCustomerDto} createCustomerDto?
   * @returns Promise
   */
  async createCustomer(
    createCustomerDto?: StripeCreateCustomerDto,
  ): Promise<StripeCustomer> {
    try {
      return await this.stripeClient.customers.create(createCustomerDto);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param  {string} id
   * @returns Promise
   */
  async retrieveCustomer(id: string): Promise<StripeCustomer> {
    try {
      return await this.stripeClient.customers.retrieve(id);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @returns Promise
   */
  async listAllCustomer(): Promise<StripeCustomerList> {
    try {
      return await this.stripeClient.customers.list();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param createStripPaymentMethod
   * @returns StripePaymentMethod
   */
  async createPaymentMethod(
    cardElementDto: CardElementDto,
  ): Promise<StripePaymentMethod> {
    try {
      const paymentMethod = await this.stripeClient.paymentMethods.create({
        type: 'card',
        card: cardElementDto,
      });
      const { ...newPaymentMethod }: StripePaymentMethod = paymentMethod;
      return newPaymentMethod;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param  {string} id
   * @returns Promise
   */
  async retrievePaymentMethod(
    method_key: string,
  ): Promise<StripePaymentMethod> {
    try {
      return await this.stripeClient.paymentMethods.retrieve(method_key);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param  {string} customer
   * @returns Promise
   */
  async retrievePaymentMethodByCustomerId(
    customer: string,
  ): Promise<StripePaymentMethod[]> {
    try {
      const { data } = await this.stripeClient.customers.listPaymentMethods(
        customer,
        {
          type: 'card',
        },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Attach a payment method to a customer
   * @param  {string} method_id
   * @param  {string} customer_id
   * @returns Promise
   */
  async attachPaymentMethodToCustomer(
    method_id: string,
    customer_id: string,
  ): Promise<StripePaymentMethod> {
    try {
      return await this.stripeClient.paymentMethods.attach(method_id, {
        customer: customer_id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /** Detach a payment method from customer
   * @param  {string} method_id
   * @returns Promise<StripePaymentMethod>
   */
  async detachPaymentMethodFromCustomer(
    method_id: string,
  ): Promise<StripePaymentMethod> {
    try {
      return await this.stripeClient.paymentMethods.detach(method_id);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Create a Stripe paymentIntent
   * @param createPaymentIntentDto
   */
  async createPaymentIntent(
    createPaymentIntentDto: CreatePaymentIntentDto,
  ): Promise<StripePaymentIntent> {
    try {
      const paymentIntent = await this.stripeClient.paymentIntents.create(
        createPaymentIntentDto,
      );
      const { ...newIntent }: StripePaymentIntent = paymentIntent;
      return newIntent;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Retrieving Payment Intent from Stripe
   * @param payment_id
   */
  async retrievePaymentIntent(
    payment_id: string,
  ): Promise<StripePaymentIntent> {
    try {
      return await this.stripeClient.paymentIntents.retrieve(payment_id);
    } catch (error) {
      console.log(error);
    }
  }

  async makePaymentIntentParam(order: Order, me: User) {
    const customerList = await this.listAllCustomer();
    const currentCustomer = customerList.data.find(
      (customer: StripeCustomer) => customer.email === me.email,
    );
    if (!currentCustomer) {
      const newCustomer = await this.createCustomer({
        name: me.name,
        email: me.email,
      });
      currentCustomer.id = newCustomer.id;
    }
    return {
      customer: currentCustomer.id,
      amount: Math.ceil(order.paid_total),
      currency: process.env.DEFAULT_CURRENCY || setting.options.currency,
      payment_method_types: ['card'],
      metadata: {
        order_tracking_number: order.tracking_number,
      },
    };
  }
}
