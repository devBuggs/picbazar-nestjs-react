import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

export class Wishlist extends CoreEntity {
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}
