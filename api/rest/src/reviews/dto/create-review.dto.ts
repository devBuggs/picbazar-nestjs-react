import { Attachment } from '../../common/entities/attachment.entity';

export class CreateReviewDto {
  rating: number;
  comment: string;
  photos?: Attachment[];
  product_id: string;
  shop_id: string;
  order_id: string;
  variation_option_id: number;
}
