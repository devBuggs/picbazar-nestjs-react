import { ArgsType, Field, ID } from '@nestjs/graphql';
import { CoreGetArguments } from 'src/common/dto/core-get-arguments.args';

@ArgsType()
export class GetQuestionArgs extends CoreGetArguments {
  @Field(() => ID)
  product_id?: number;
}
