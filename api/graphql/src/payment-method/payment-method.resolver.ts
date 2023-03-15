import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Card} from './entities/card.entity';
import {AddNewCardInput} from './dto/add-new-card.input';
import {PaymentMethodService} from './payment-method.service';
import {UpdateCardInput} from './dto/update-card.input';
import {SavePaymentMethodInput} from './dto/save-payment-method.input';

@Resolver(() => Card)
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Mutation(() => Card)
  addNewCard(@Args('input') createCardInput: AddNewCardInput) {
    return this.paymentMethodService.create(createCardInput);
  }

  @Query(() => [Card], { name: 'cards' })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Mutation(() => Card)
  updateCard(@Args('input') updateCardInput: UpdateCardInput) {
    return this.paymentMethodService.update(
      updateCardInput.id,
      updateCardInput,
    );
  }

  @Mutation(() => Boolean)
  deleteCard(@Args('id', { type: () => ID }) id) {
    const idInNumber = Number(id);
    return this.paymentMethodService.remove(idInNumber);
  }

  // set-default-card
  @Mutation(() => Card, { name: 'setDefaultPaymentMethod' })
  setDefaultPaymentMethod(@Args('method_id', { type: () => ID }) method_id) {
    return this.paymentMethodService.saveDefaultCart(method_id);
  }

  // save-payment-method
  @Mutation(() => Card)
  savePaymentMethod(
    @Args('input') savePaymentMethodInput: SavePaymentMethodInput,
  ) {
    return this.paymentMethodService.savePaymentMethod({
      ...savePaymentMethodInput,
      default_card: false,
    });
  }
}
