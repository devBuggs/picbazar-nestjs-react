import { InputType, ObjectType } from '@nestjs/graphql';
import { Coupon } from '../entities/coupon.entity';

@InputType()
export class VerifyCouponInput {
  code: string;
  sub_total: number;
}
@ObjectType()
export class VerifyCouponResponse {
  is_valid: boolean;
  coupon: Coupon;
  message: string;
}
