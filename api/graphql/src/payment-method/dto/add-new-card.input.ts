import { Card } from '../entities/card.entity';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class AddNewCardInput extends PickType(Card, [
  'method_key',
  'default_card',
]) {}
