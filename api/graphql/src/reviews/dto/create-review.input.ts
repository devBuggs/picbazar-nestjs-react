import { Field, ID, InputType } from '@nestjs/graphql';
import { Attachment } from '../../common/entities/attachment.entity';

@InputType()
export class CreateReviewInput {
  rating: number;
  comment: string;
  photos?: Attachment[];
  product_id: string;
  shop_id: string;
  order_id: string;
  @Field(() => ID)
  variation_option_id?: number;
}
