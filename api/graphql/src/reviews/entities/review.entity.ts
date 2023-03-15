import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { InputType, ObjectType } from '@nestjs/graphql';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { Order } from '../../orders/entities/order.entity';
import { Shop } from '../../shops/entities/shop.entity';
import { AbusiveReport } from './abusive-report.entity';

@InputType('ReviewInputType', { isAbstract: true })
@ObjectType()
export class Review extends CoreEntity {
  name: string;
  comment: string;
  shop: Shop;
  order: Order;
  customer: User;
  photos: Attachment[];
  user: User;
  product: Product;
  feedbacks?: Feedback[];
  my_feedback?: Feedback;
  positive_feedbacks_count?: number;
  negative_feedbacks_count?: number;
  user_id: number;
  product_id: number;
  rating: number;
  shop_id: string;
  variation_option_id?: string;
  abusive_reports_count?: number;
  abusive_reports?: AbusiveReport[];
}
