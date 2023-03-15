import { CoreEntity } from 'src/common/entities/core.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('FeedbackInputType', { isAbstract: true })
@ObjectType()
export class Feedback extends CoreEntity {
  user_id: string;
  model_type: string;
  @Field(() => ID)
  model_id: number;
  positive?: boolean;
  negative?: boolean;
}
