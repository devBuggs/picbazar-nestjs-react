import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { AttributeValue } from './attribute-value.entity';

export class Attribute extends CoreEntity {
  name: string;
  shop_id: string;
  shop: Shop;
  slug: string;
  values: AttributeValue[];
  language: string;
  translated_languages: string[];
}
