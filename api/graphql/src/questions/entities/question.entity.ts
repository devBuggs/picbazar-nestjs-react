import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Feedback } from 'src/feedback/entities/feedback.entity';

@InputType('QuestionInputType', { isAbstract: true })
@ObjectType()
export class Question extends CoreEntity {
  user_id?: number;
  @Field(() => ID)
  product_id: number;
  @Field(() => ID)
  shop_id: string;
  question?: string;
  answer?: string;
  positive_feedbacks_count?: number;
  negative_feedbacks_count?: number;
  product: Product;
  user?: User;
  feedbacks?: Feedback[];
  my_feedback?: Feedback;
}
