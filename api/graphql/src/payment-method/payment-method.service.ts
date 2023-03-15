import paymentGatewayJson from './payment-gateway.json';
import cards from './payment-methods.json';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UsersService as AuthService } from 'src/users/users.service';
import {
  StripeCustomer,
  StripePaymentMethod,
} from 'src/payment/entity/stripe.entity';
import { StripePaymentService } from 'src/payment/stripe-payment.service';
import { Setting } from 'src/settings/entities/setting.entity';
import { SettingsService } from 'src/settings/settings.service';
import { AddNewCardInput } from './dto/add-new-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { PaymentGateWay } from './entities/payment-gateway.entity';
import { Card } from './entities/card.entity';

const paymentMethods = plainToClass(Card, cards);
const paymentGateways = plainToClass(PaymentGateWay, paymentGatewayJson);

@Injectable()
export class PaymentMethodService {
  private paymentMethods: Card[] = paymentMethods;

  constructor(
    private readonly authService: AuthService,
    private readonly stripeService: StripePaymentService,
    private readonly settingService: SettingsService,
  ) {}

  private setting: Setting = this.settingService.getSettings();

  async create(createPaymentMethodDto: AddNewCardInput) {
    try {
      const defaultCard = this.paymentMethods.find(
        (card: Card) => card.default_card,
      );
      if (!defaultCard || this.paymentMethods.length === 0) {
        createPaymentMethodDto.default_card = true;
      }
      if (createPaymentMethodDto.default_card) {
        this.paymentMethods = [...this.paymentMethods].map((card: Card) => {
          card.default_card = false;
          return card;
        });
      }
      const paymentGateway: string = this.setting.options.paymentGateway;
      return await this.saveCard(createPaymentMethodDto, paymentGateway);
    } catch (error) {
      console.log(error);
      return this.paymentMethods[0];
    }
  }

  findAll() {
    return this.paymentMethods;
  }

  findOne(id: number) {
    return this.paymentMethods.find((pm: Card) => pm.id === Number(id));
  }

  update(id: number, updatePaymentMethodDto: UpdateCardInput) {
    return this.findOne(id);
  }

  remove(id: number) {
    const card: Card = this.findOne(id);
    this.paymentMethods = [...this.paymentMethods].filter(
      (cards: Card) => cards.id !== id,
    );
    return card;
  }

  saveDefaultCart(method_id: string) {
    this.paymentMethods = [...this.paymentMethods].map((c: Card) => {
      if (c.id === Number(method_id)) {
        c.default_card = true;
      } else {
        c.default_card = false;
      }
      return c;
    });
    return this.findOne(Number(method_id));
  }

  async savePaymentMethod(createPaymentMethodDto: AddNewCardInput) {
    const paymentGateway: string = this.setting.options.paymentGateway;
    try {
      return this.saveCard(createPaymentMethodDto, paymentGateway);
    } catch (err) {
      console.log(err);
    }
  }

  async saveCard(
    createPaymentMethodDto: AddNewCardInput,
    paymentGateway: string,
  ) {
    const { method_key, default_card } = createPaymentMethodDto;
    const defaultCard = this.paymentMethods.find(
      (card: Card) => card.default_card,
    );
    if (!defaultCard || this.paymentMethods.length === 0) {
      createPaymentMethodDto.default_card = true;
    }
    const retrievedPaymentMethod =
      await this.stripeService.retrievePaymentMethod(method_key);
    if (
      this.paymentMethodAlreadyExists(retrievedPaymentMethod.card.fingerprint)
    ) {
      return this.paymentMethods.find(
        (pMethod: Card) => pMethod.method_key === method_key,
      );
    } else {
      const paymentMethod = await this.makeNewPaymentMethodObject(
        createPaymentMethodDto,
        paymentGateway,
      );
      this.paymentMethods.push(paymentMethod);
      return paymentMethod;
    }
    switch (paymentGateway) {
      case 'stripe':
        break;
      case 'paypal':
        // TODO
        //paypal code goes here
        break;
      default:
        break;
    }
  }

  paymentMethodAlreadyExists(fingerPrint: string) {
    const paymentMethod = this.paymentMethods.find(
      (pMethod: Card) => pMethod.fingerprint === fingerPrint,
    );
    if (paymentMethod) {
      return true;
    }
    return false;
  }

  async makeNewPaymentMethodObject(
    createPaymentMethodDto: AddNewCardInput,
    paymentGateway: string,
  ) {
    const { method_key, default_card } = createPaymentMethodDto;
    const { id: user_id, name, email } = this.authService.me();
    const listOfCustomer = await this.stripeService.listAllCustomer();
    let currentCustomer = listOfCustomer.data.find(
      (customer: StripeCustomer) => customer.email === email,
    );
    if (!currentCustomer) {
      const newCustomer = await this.stripeService.createCustomer({
        name,
        email,
      });
      currentCustomer = newCustomer;
    }
    const attachedPaymentMethod: StripePaymentMethod =
      await this.stripeService.attachPaymentMethodToCustomer(
        method_key,
        currentCustomer.id,
      );
    let customerGateway: PaymentGateWay = paymentGateways.find(
      (pGateway: PaymentGateWay) =>
        pGateway.user_id === user_id &&
        pGateway.gateway_name === paymentGateway,
    );
    if (!customerGateway) {
      customerGateway = {
        id: Number(Date.now()),
        user_id: user_id,
        customer_id: currentCustomer['id'],
        gateway_name: paymentGateway,
        created_at: new Date(),
        updated_at: new Date(),
      };
      paymentGateways.push(customerGateway);
    }
    const paymentMethod: Card = {
      id: Number(Date.now()),
      method_key: method_key,
      payment_gateway_id: customerGateway.id,
      default_card: default_card,
      fingerprint: attachedPaymentMethod.card.fingerprint,
      owner_name: attachedPaymentMethod.billing_details.name,
      last4: attachedPaymentMethod.card.last4,
      expires: `${attachedPaymentMethod.card.exp_month}/${attachedPaymentMethod.card.exp_year}`,
      network: attachedPaymentMethod.card.brand,
      type: attachedPaymentMethod.card.funding,
      origin: attachedPaymentMethod.card.country,
      verification_check: attachedPaymentMethod.card.checks.cvc_check,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return paymentMethod;
  }
}
