import { InputType, PickType } from '@nestjs/graphql';
import { Coupon } from '../entities/coupon.entity';

@InputType()
export class CreateCouponInput extends PickType(Coupon, [
  'code',
  'type',
  'amount',
  'description',
  'minimum_cart_amount',
  'image',
  'expire_at',
  'active_from',
  'language',
]) {}
