import {AddNewCardInput} from './add-new-card.input';
import {Field, ID, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateCardInput extends PartialType(
  AddNewCardInput,
) {
  @Field(() => ID)
  id: number;
}
